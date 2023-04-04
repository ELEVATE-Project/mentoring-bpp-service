'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/storage/bap/queries')

exports.select = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const sessionId = message.order.item.id
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id },
			defaults: { bapUri: context.bap_uri },
		})
		await protocolCallbacks.onSelect({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bapId,
			bapUri: bap.bapUri,
			sessionId,
		})
	} catch (err) {
		console.log(err)
	}
}
