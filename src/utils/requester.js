'use strict'
const axios = require('axios')
const { createAuthorizationHeader } = require('@utils/auth')
/* const https = require('https')
const httpsAgent = new https.Agent({ rejectUnauthorized: false }) */

exports.postRequest = async (url, headers, body, { shouldSign }) => {
	if (shouldSign) {
		headers = { ...headers, authorization: await createAuthorizationHeader(body) }
	}
	return new Promise((resolve, reject) => {
		axios({ method: 'post', url, data: body, headers, timeout: 3000 })
			.then((res) => {
				resolve(res)
			})
			.catch((error) => {
				console.log(error)
				reject(error)
				//reject({ status: error.response.status, statusText: error.response.statusText })
			})
	})
}
