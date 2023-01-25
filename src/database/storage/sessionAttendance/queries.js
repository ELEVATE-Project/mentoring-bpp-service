'use strict'
const SessionAttendance = require('./model')
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await new SessionAttendance(data).save()
	} catch (err) {
		console.log(err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		return await new Promise((resolve, reject) => {
			SessionAttendance.findOrCreate(where, defaults, (err, sessionAttendance, isNew) => {
				if (err) reject(err)
				if (isNew) console.log('New SessionAttendance Entry Created')
				else console.log('Found Existing SessionAttendance')
				resolve({ sessionAttendance, isNew })
			})
		})
	} catch (err) {
		console.log('SessionAttendance.findOrCreate: ', err)
		throw err
	}
}
