'use strict'
const responses = require('@constants/responses.json')
const { search } = require('@utils/search')

exports.search = async (req, res) => {
	try {
		console.debug(JSON.stringify(req.body, null, '\t'))
		res.status(200).send(responses.success_ack)
		search(req)
	} catch (err) {}
}
