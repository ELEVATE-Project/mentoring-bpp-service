'use strict'
const responses = require('@constants/responses.json')
const selectService = require('@services/apis/select')
/* const statusService = require('@services/apis/status')*/
const cancelService = require('@services/apis/cancel')
const searchService = require('@services/apis/search')
const initService = require('@services/apis/init')
const confirmService = require('@services/apis/confirm')
const userDetailsService = require('@services/apis/userDetails')

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
/*
exports.status = async (req, res) => {
	try {
		res.status(200).send(responses.success_ack)
		await statusService.status(req.body)
	} catch (err) {
		console.log(err)
	}
} */

exports.getUserDetails = async (req, res) => {
	try {
		const users = await userDetailsService.getUserDetails(req.body)
		res.status(200).json({
			status: 'success',
			data: {
				users,
			},
		})
	} catch (err) {
		console.log(err)
		res.status(400).json({
			status: 'error',
			message: err.message || 'Failed to get user details',
		})
	}
}
