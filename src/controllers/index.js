'use strict'
const responses = require('@constants/responses.json')
const { search, init, confirm } = require('@utils/callbackHandlers')

exports.search = async (req, res) => {
	try {
		//console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		search(req.body)
	} catch (err) {}
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
