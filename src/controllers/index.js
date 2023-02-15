'use strict'
const responses = require('@constants/responses.json')
const confirmService = require('@services/apis/confirm')
const selectService = require('@services/apis/select')
const statusService = require('@services/apis/status')
const cancelService = require('@services/apis/cancel')
const sessionService = require('@services/session')
const searchService = require('@services/apis/search')
const initService = require('@services/apis/init')


exports.search = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		searchService.search(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.select = async (req, res) => {
	try {
		await res.status(200).send(responses.success_ack)
		selectService.select(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.init = async (req, res) => {
	try {
		res.status(200).send(responses.success_ack)
		initService.init(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.confirm = async (req, res) => {
	try {
		res.status(200).send(responses.success_ack)
		confirmService.confirm(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.cancel = async (req, res) => {
	try {
		res.status(200).send(responses.success_ack)
		cancelService.cancel(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.status = async (req, res) => {
	try {
		res.status(200).send(responses.success_ack)
		await statusService.status(req.body)
	} catch (err) {
		console.log(err)
	}
}

exports.sessionUpdate = async (req, res) => {
	try {
		console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		await sessionService.session(req.body)
	} catch (err) {
		console.log(err)
	}
}
