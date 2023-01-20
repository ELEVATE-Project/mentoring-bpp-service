'use strict'
const Bap = require('./model')

exports.createBap = async (data) => {
	try {
		const response = await new Bap(data).save()
		console.log(response)
		return response
	} catch (err) {
		console.log(err)
	}
}
