'use strict'
const axios = require('axios')
const { createAuthorizationHeader } = require('@utils/auth')
const { isEmpty } = require('@utils/generic')
const pathToRegexp = require('path-to-regexp')
/* const https = require('https')
const httpsAgent = new https.Agent({ rejectUnauthorized: false }) */

exports.postRequest = async (url, headers, body, { shouldSign }) => {
	console.log('reached here')
	try {
		if (shouldSign) headers = { ...headers, authorization: await createAuthorizationHeader(body) }
		const response = await axios.post(url, body, { headers, timeout: 3000 })
		console.log('RESPONSE: ', JSON.stringify(response.data, null, 2))
		return response.data
	} catch (err) {
		if (err.response) {
			console.log('Response Data: ', err.response.data)
			console.log('Response Status:', err.response.status)
			console.log('Response Headers', err.response.headers)
		} else if (err.request) console.log(err.request)
		else console.log('Error: ', err.message)
		console.log('Request CONFIG: ', err.config)
	}
}

exports.getRequest = async (url, headers, pathParams = {}, queryParams = {}) => {
	try {
		url = pathToRegexp.compile(url)(pathParams)
		if (!isEmpty(queryParams)) url += '?' + new URLSearchParams(queryParams).toString()
		const response = await axios.get(url)
		console.log('RESPONSE: ', JSON.stringify(response.data, null, 2))
		return response.data
	} catch (err) {
		if (err.response) {
			console.log('Response Data: ', err.response.data)
			console.log('Response Status:', err.response.status)
			console.log('Response Headers', err.response.headers)
		} else if (err.request) console.log(err.request)
		else console.log('Error: ', err.message)
		console.log('Request CONFIG: ', err.config)
	}
}

exports.internalPostRequest = (url) => {
	return async ({ headers, body }) => await exports.postRequest(url, headers, body, { shouldSign: false })
}
