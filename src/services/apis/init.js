'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/storage/bap/queries')

exports.init = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const customer = message.order.fulfillments[0].customer
		const sessionId = message.order.items[0].id
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id, bapUri: context.bap_uri },
		})
		await protocolCallbacks.onInit({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bapId,
			bapUri: bap.bapUri,
			customer,
			sessionId,
		})
	} catch (err) {
		console.log(err)
	}
}
