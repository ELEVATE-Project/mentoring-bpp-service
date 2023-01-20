'use strict'
const SessionAttendance = require('./model')

exports.createSessionAttendance = async (data) => {
	try {
		return await new SessionAttendance(data).save()
	} catch (err) {
		console.log(err)
	}
}
