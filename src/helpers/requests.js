'use strict'
const { internalPOSTRequest, internalGETRequest } = require('@utils/requester')

exports.internalRequests = {
	mentoringPOST: internalPOSTRequest(process.env.MENTORING_URI),
	catalogGET: internalGETRequest(process.env.BPP_CATALOG_URI),
}
