'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/queries/bap')

exports.select = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const sessionId = message.order.item.id
		const { bap } = await bapQueries.findOrCreate({
			where: { bap_id: context.bap_id, bap_uri: context.bap_uri },
		})
		await protocolCallbacks.onSelect({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bap_id,
			bapUri: bap.bap_uri,
			sessionId,
		})
	} catch (err) {
		console.log(err)
	}
}
