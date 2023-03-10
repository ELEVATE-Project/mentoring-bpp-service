'use strict'
const bapQueries = require('@database/storage/bap/queries')
const sessionAttendanceQueries = require('@database/storage/sessionAttendance/queries')
const userQueries = require('@database/storage/user/queries')
const { internalRequests } = require('@helpers/requests')
const protocolCallbacks = require('@services/protocolCallbacks/')
const sessionAttendanceModel = require('@database/storage/sessionAttendance/model')

exports.confirm = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id, bapUri: context.bap_uri },
		})
		console.log(bap)
		const billing = message.order.billing
		const { user } = await userQueries.findOrCreate({
			where: { email: billing.email, bapId: bap._id },
			defaults: { name: billing.name },
		})
		console.log('User:', user)
		const { sessionAttendance, isNew } = await sessionAttendanceQueries.findOrCreate({
			where: {
				userId: user._id,
				sessionId: message.order.items[0].id,
				fulfillmentId: message.order.fulfillments[0].id,
				status: sessionAttendanceModel.STATUS.ACTIVE,
			},
		})
		console.log(sessionAttendance)
		if (!isNew) throw 'Confirm.APIs.Services: User Already Enrolled'
		const response = await internalRequests.mentoringPOST({
			route: process.env.MENTORING_SESSION_ENROLL_ROUTE,
			headers: {
				internal_access_token: process.env.MENTORING_INTERNAL_ACCESS_TOKEN,
			},
			body: {
				userId: user._id,
				sendNotification: false,
				name: user.name,
				sessionId: sessionAttendance.sessionId,
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
