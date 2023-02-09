'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/storage/bap/queries')

exports.init = async (requestBody) => {
	try {
		const context = requestBody.context
		//const message = requestBody.message
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id, bapUri: context.bap_uri },
		})
		await protocolCallbacks.onInit({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bapId,
			bapUri: bap.bapUri,
		})
	} catch (err) {
		console.log(err)
	}
}
