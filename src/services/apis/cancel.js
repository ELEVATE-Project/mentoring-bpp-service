'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/storage/bap/queries')
const sessionAttendanceQueries = require('@database/storage/sessionAttendance/queries')
const userQueries = require('@database/storage/user/queries')
const { internalRequests } = require('@helpers/requests')
const sessionAttendanceModel = require('@database/storage/sessionAttendance/model')

exports.cancel = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const orderId = message.order_id
		const reasonId = message.cancellation_reason_id
		const reasonDesc = message.descriptor?.name
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id, bapUri: context.bap_uri },
		})
		const sessionAttendanceDoc = await sessionAttendanceQueries.findByOrderId(orderId)
		if (!sessionAttendanceDoc) return console.log('SessionAttendance Not Found')
		if (sessionAttendanceDoc.status != sessionAttendanceModel.STATUS.ACTIVE)
			return console.log('ERROR: User Currently Not Enrolled')
		const user = await userQueries.findById(sessionAttendanceDoc.userId)
		const response = await internalRequests.mentoringPOST({
			route: process.env.MENTORING_SESSION_UNENROLL_ROUTE,
			headers: {
				internal_access_token: process.env.MENTORING_INTERNAL_ACCESS_TOKEN,
			},
			body: {
				userId: sessionAttendanceDoc.userId.toString(),
				sendNotification: false,
				name: user.name,
				sessionId: sessionAttendanceDoc.sessionId,
			},
		})
		if (!response || response.responseCode !== 'OK') return console.log('UnEnroll Failed At Mentoring')
		const updatedSessionAttendanceDoc = await sessionAttendanceQueries.setStatusAsCancelledById(
			sessionAttendanceDoc._id,
			{ reasonId, reasonDesc }
		)
		console.log(updatedSessionAttendanceDoc)
		await protocolCallbacks.onCancel({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bapId,
			bapUri: bap.bapUri,
			orderId: updatedSessionAttendanceDoc.orderId,
		})
	} catch (err) {
		console.log(err)
	}
}
