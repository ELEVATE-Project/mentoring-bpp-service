'use strict'
const bapQueries = require('@database/storage/bap/queries')
const sessionAttendanceQueries = require('@database/storage/sessionAttendance/queries')
const userQueries = require('@database/storage/user/queries')
const { internalRequests } = require('@helpers/requests')
const protocolCallbacks = require('@services/protocolCallbacks/')
const emailToUserQueries = require('@database/storage/emailToUser/queries')
const userIdToAttendanceQueries = require('@database/storage/userIdToAttendance/queries')
const client = require('@configs/cassandra')
const uuid = require('uuid')
//const sessionAttendanceModel = require('@database/storage/sessionAttendance/model')

exports.confirm = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id },
			defaults: { bapUri: context.bap_uri },
		})
		console.log('BAP:', bap)
		const billing = message.order.billing
		/* const { user } = await userQueries.findOrCreate({
			where: { email: billing.email, bapId: bap._id },
			defaults: { name: billing.name },
		}) */
		/* const emailToUser = await emailToUserQueries.findOrCreate({
			where: { email: billing.email, bapId: bap._id },
		}) */
		const emailToUser = await emailToUserQueries.findOne({
			where: {
				email: billing.email,
				bapId: bap.id,
			},
		})
		console.log('EMAIL TO USER: ', emailToUser)
		let user
		if (!emailToUser) {
			console.log("EMAILTOUSER DOESN'T EXIST")
			user = await userQueries.create({
				name: billing.name,
				email: billing.email,
				bapId: bap.id,
			})
			user.id = uuid.v4({ uuid: user.id.buffer, format: 'hex' })
			user.bapId = uuid.v4({ uuid: user.bapId.buffer, format: 'hex' })
			console.log('NEW USER: ', user)
			const newEmailToUser = await emailToUserQueries.create({
				email: billing.email,
				bapId: bap.id,
				userId: user.id,
			})
			newEmailToUser.bapId = uuid.v4({ uuid: newEmailToUser.bapId.buffer, format: 'hex' })
			newEmailToUser.userId = uuid.v4({ uuid: newEmailToUser.userId.buffer, format: 'hex' })
			console.log('NEW EMAILTOUSER: ', newEmailToUser)
		} else {
			console.log('EMAILTOUSER EXIST')
			user = await userQueries.findOne({
				id: emailToUser.userId,
			})
			console.log('EXISTING USER: ', user)
		}

		console.log('FIRST PART')
		/* if (emailToUser.isNew) {
			user = await userQueries.create({
				name: billing.name,
				email: billing.email,
				bapId: bap.id,
			})
			console.log('CONFIRM CONTROLLER USER: ', user)
		} */
		console.log('CONFIRM CONTROLLER EMAILTOUSER: ', emailToUser)
		/* const sessionAttendance = await sessionAttendanceQueries.findOrCreate({
			where: {
				userId: user._id,
				sessionId: message.order.items[0].id,
				fulfillmentId: message.order.fulfillments[0].id,
				//status: sessionAttendanceModel.STATUS.ACTIVE,
			},
		}) */
		const userIdToAttendance = await userIdToAttendanceQueries.findOne({
			where: {
				userId: user.id,
				sessionId: message.order.items[0].id,
				fulfillmentId: message.order.fulfillments[0].id,
			},
		})
		if (userIdToAttendance) throw 'Confirm.APIs.Services: User Already Enrolled'
		let sessionAttendance
		if (!userIdToAttendance) {
			sessionAttendance = await sessionAttendanceQueries.create({
				userId: user.id,
				sessionId: message.order.items[0].id,
				fulfillmentId: message.order.fulfillments[0].id,
				sessionAttendeeId: message.order.items[0].id,
				orderId: client.uuid(),
				status: 1,
				cancellation: { reason: 'text', reasonId: 1 },
			})
			await userIdToAttendanceQueries.create({
				userId: user.id,
				sessionId: message.order.items[0].id,
				fulfillmentId: message.order.fulfillments[0].id,
				attendanceId: sessionAttendance.id,
			})
		} else {
			sessionAttendance = await sessionAttendanceQueries.findOne({
				userId: user._id,
				sessionId: message.order.items[0].id,
				fulfillmentId: message.order.fulfillments[0].id,
			})
		}
		console.log(sessionAttendance)

		const response = await internalRequests.mentoringPOST({
			route: process.env.MENTORING_SESSION_ENROLL_ROUTE,
			headers: {
				internal_access_token: process.env.MENTORING_INTERNAL_ACCESS_TOKEN,
			},
			body: {
				userId: user._id,
				sendNotification: false,
				name: user.name,
				sessionId: sessionAttendance.sessionAttendance.sessionId,
			},
		})
		await protocolCallbacks.onConfirm({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bapId,
			bapUri: bap.bapUri,
			orderId: sessionAttendance.orderId,
			fulfillmentId: sessionAttendance.fulfillmentId,
			joinLink: response?.result?.link,
		})
	} catch (err) {
		console.log(err)
	}
}
