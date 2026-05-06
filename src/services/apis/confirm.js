'use strict'
const bapQueries = require('@database/queries/bap')
const sessionAttendanceQueries = require('@database/queries/sessionAttendance')
const userQueries = require('@database/queries/user')
const { internalRequests } = require('@helpers/requests')
const protocolCallbacks = require('@services/protocolCallbacks/')
//const sessionAttendanceModel = require('@database/storage/sessionAttendance/model')

exports.confirm = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const { bap } = await bapQueries.findOrCreate({
			where: { bap_id: context.bap_id, bap_uri: context.bap_uri },
		})
		console.log(bap)
		const billing = message.order.billing
		const { user } = await userQueries.findOrCreate({
			where: { email: billing.email, bap_id: bap.bap_id },
			defaults: { name: billing.name },
		})
		console.log(user)
		const { sessionAttendance, isNew } = await sessionAttendanceQueries.findOrCreate({
			where: {
				user_id: user.id,
				session_id: message.order.items[0].id,
				fulfillment_id: message.order.fulfillments[0].id,
				status: 0,
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
				user_id: user.id,
				name: user.name,
				session_id: sessionAttendance.session_id,
			},
		})
		console.log(response.message)
		await protocolCallbacks.onConfirm({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bap_id,
			bapUri: bap.bap_uri,
			orderId: sessionAttendance.order_id,
			fulfillmentId: sessionAttendance.fulfillment_id,
			joinLink: response?.result?.link,
		})
	} catch (err) {
		console.log(err)
	}
}
