'use strict'
const responses = require('@constants/responses.json')
const { search, init, confirm, cancel, status } = require('@utils/callbackHandlers')
const { postRequest } = require('@utils/requester')

exports.search = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		console.debug(JSON.stringify(req.body, null, '\t'))
		const catalogResponse = await postRequest(process.env.BPP_CATALOG_URI + '/search', {}, req.body.message, {})
		console.log('CONTROLLER: ', catalogResponse)
		search(req.body, catalogResponse)
	} catch (err) {
		console.log(err)
	}
}

exports.init = async (req, res) => {
	try {
		//console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		init(req.body)
	} catch (err) {}
}

exports.confirm = async (req, res) => {
	try {
		//console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		confirm(req.body)
	} catch (err) {}
}

exports.cancel = async (req, res) => {
	try {
		//console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		cancel(req.body)
	} catch (err) {}
}

exports.status = async (req, res) => {
	try {
		//console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		status(req.body)
	} catch (err) {}
}
