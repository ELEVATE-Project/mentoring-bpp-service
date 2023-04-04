'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/storage/bap/queries')
const idToBapIdQueries = require('@database/storage/idToBapId/queries')

exports.search = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const { bap } = await bapQueries.findOrCreate({
			where: { bapId: context.bap_id },
			defaults: { bapUri: context.bap_uri }, //, bapUri: context.bap_uri },
		})
		const { idToBapId } = await idToBapIdQueries.findOrCreate({
			where: { id: bap.id },
			defaults: { bapId: bap.bapId },
		})
		console.log('CONTROLLER idToBapId: ', idToBapId)
		console.log('CONTROLLER BAP: ', bap)
		//console.log(bap.id.buffer)
		await protocolCallbacks.onSearch({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bapId,
			bapUri: bap.bapUri,
			message,
		})
	} catch (err) {
		console.log(err)
	}
}
