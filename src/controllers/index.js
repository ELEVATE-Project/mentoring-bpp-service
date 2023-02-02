'use strict'
const responses = require('@constants/responses.json')
const { search, init, cancel, status } = require('@utils/callbackHandlers')
const { postRequest } = require('@utils/requester')
const confirmService = require('@services/apis/confirm')
const selectService = require('@services/apis/select')
const statusService = require('@services/apis/status')
const cancelService = require('@services/apis/cancel')

exports.search = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		console.debug(JSON.stringify(req.body, null, '\t'))
		const catalogResponse = await postRequest(process.env.BPP_CATALOG_URI, '/search', {}, req.body.message, {})
		console.log('CONTROLLER: ', catalogResponse)
		search(req.body, catalogResponse)
	} catch (err) {
		console.log(err)
	}
}

exports.select = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		console.debug(JSON.stringify(req.body, null, '\t'))
		await selectService.select(req.body)
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
		res.status(200).send(responses.success_ack)
		await confirmService.confirm(req.body)
	} catch (err) {}
}

exports.cancel = async (req, res) => {
	try {
		//console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		await cancelService.cancel(req.body)
	} catch (err) {}
}

exports.status = async (req, res) => {
	try {
		console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		await statusService.status(req.body)
	} catch (err) {
		console.log(err)
	}
}
