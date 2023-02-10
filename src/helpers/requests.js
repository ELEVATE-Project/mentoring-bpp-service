'use strict'
const { internalPOSTRequest, internalGETRequest, externalPOSTRequest } = require('@utils/requester')

exports.internalRequests = {
	mentoringPOST: internalPOSTRequest(process.env.MENTORING_URI),
	catalogGET: internalGETRequest(process.env.BPP_CATALOG_URI),
	catalogPOST: internalPOSTRequest(process.env.BPP_CATALOG_URI),
}

exports.externalRequests = {
	callbackPOST: externalPOSTRequest(process.env.SHOULD_SIGN_CALLBACK_REQUESTS === 'false' ? false : true),
}
