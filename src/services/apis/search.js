'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const bapQueries = require('@database/queries/bap')
const { raw } = require('express')

exports.search = async (requestBody) => {
	try {
		const context = requestBody.context
		const message = requestBody.message
		const { bap } = await bapQueries.findOrCreate({
			where: { bap_id: context.bap_id, bap_uri: context.bap_uri },
			defaults: { raw: true },
		})
		console.log('search.services: ', bap)
		await protocolCallbacks.onSearch({
			transactionId: context.transaction_id,
			messageId: context.message_id,
			bapId: bap.bap_d,
			bapUri: bap.bap_uri,
			message,
		})
	} catch (err) {
		console.log(err)
	}
}
