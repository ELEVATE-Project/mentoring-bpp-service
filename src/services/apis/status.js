'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const sessionAttendanceQueries = require('@database/storage/sessionAttendance/queries')
const bapQueries = require('@database/storage/bap/queries')

exports.status = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const orderId = message.order_id
		const sessionAttendanceDoc = await sessionAttendanceQueries.findByOrderId(orderId)
		if (!sessionAttendanceDoc) return console.log('SessionAttendance Not Found')
		console.log(sessionAttendanceDoc)
		const { bap } = await bapQueries.findOrCreate({
			where: { bap_id: context.bap_id, bap_uri: context.bap_uri },
		})
		const status = sessionAttendanceDoc.statusText
		console.log(status)
		await protocolCallbacks.onStatus({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bap_id,
			bapUri: bap.bap_uri,
			status,
			sessionId: sessionAttendanceDoc.sessionId.toString(),
			fulfillmentId: sessionAttendanceDoc.fulfillmentId.toString(),
			orderId,
		})
	} catch (err) {
		console.log(err)
	}
}
