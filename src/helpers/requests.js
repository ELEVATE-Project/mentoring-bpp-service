'use strict'
const { internalPostRequest } = require('@utils/requester')

exports.internalRequests = {
	mentoringPost: internalPostRequest(process.env.MENTORING_URI),
}
