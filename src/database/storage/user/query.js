'use strict'
const User = require('./model')

exports.createUser = async (data) => {
	try {
		return await new User(data).save()
	} catch (err) {
		console.log(err)
	}
}
