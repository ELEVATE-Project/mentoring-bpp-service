'use strict'

exports.contextBuilder = async (transactionId, messageId, action, bapId, bapUri) => {
	return {
		domain: process.env.DOMAIN,
		/* country: process.env.COUNTRY,
		city: process.env.CITY, */
		action,
		bap_id: bapId,
		bap_uri: bapUri,
		bpp_id: process.env.BPP_ID,
		bpp_uri: process.env.BPP_URI,
		timestamp: new Date(),
		ttl: process.env.BPP_TTL,
		version: process.env.SCHEMA_CORE_VERSION,
		message_id: messageId,
		transaction_id: transactionId,
	}
}
