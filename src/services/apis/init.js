'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/queries/bap')

exports.init = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const customer = message.order.fulfillments[0].customer
		const sessionId = message.order.items[0].id
		const { bap } = await bapQueries.findOrCreate({
			where: { bap_id: context.bap_id, bap_uri: context.bap_uri },
		})
		console.log('INIT')
		console.log(customer)
		console.log(sessionId)
		await protocolCallbacks.onInit({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bap_id,
			bapUri: bap.bap_uri,
			customer,
			sessionId,
		})
	} catch (err) {
		console.log(err)
	}
}
