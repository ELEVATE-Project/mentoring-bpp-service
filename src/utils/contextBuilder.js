'use strict'

exports.contextBuilder = async (transactionId, messageId, action) => {
	return {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action,
		bpp_id: process.env.BPP_ID,
		bpp_uri: process.env.BPP_URI,
		timestamp: new Date(),
		ttl: process.env.BPP_TTL,
		core_version: process.env.SCHEMA_CORE_VERSION,
		message_id: messageId,
		transaction_id: transactionId,
	}
}
