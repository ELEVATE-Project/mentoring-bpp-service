'use strict'

const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')
const sessionAttendanceModel = require('./model')
const uuid = require('uuid')

const findOne = async ({ where = {} }) => {
	try {
		console.log('SELECT WHERE: ', where)
		const sessionAttendance = await new Promise((resolve, reject) => {
			sessionAttendanceModel.findOne({ sessionId: where.sessionId }, (err, result) => {
				console.log('CALLBACK')
				if (err) reject(err)
				else resolve(result)
			})
		})
		if (sessionAttendance) return sessionAttendance.toJSON()
		else return null
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		console.log('CREATE DATA: ', data)
		const bap = new sessionAttendanceModel({
			/* bapId: data.bapId, id: client.uuid(), bapUri: data.bapUri */
		})
		const result = await new Promise((resolve, reject) => {
			bap.save((err) => {
				if (err) reject(err)
				else resolve(bap)
			})
		})
		console.log('CREATE RESULT: ', result.toJSON())
		return result.toJSON()
	} catch (err) {
		console.log('CASSANDRA sessionAttendance CREATE: ', err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(defaults, where)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		const sessionAttendance = await findOne({ where })
		console.log('sessionAttendance AFTER FIND: ', sessionAttendance)
		if (sessionAttendance) {
			sessionAttendance.id = sessionAttendance.id.buffer.toString('hex')
			console.log('AFTER HEX: ', sessionAttendance)
			return { sessionAttendance, isNew: false }
		} else {
			const newSessionAttendance = await create(defaults)
			newSessionAttendance.id = newSessionAttendance.id.buffer.toString('hex')
			console.log('NEW sessionAttendance (AFTER HEX): ', newSessionAttendance)
			return { sessionAttendance: newSessionAttendance, isNew: true }
		}
	} catch (err) {
		console.log('CASSANDRA sessionAttendance FINDORCREATE: ', err)
	}
}

const sessionAttendanceQueries = { create, findOrCreate }
module.exports = sessionAttendanceQueries
/* exports.setStatusAsCancelledById = async (id, { reasonId, reasonDesc }) => {
	try {
		const doc = await sessionAttendanceModel.findById(id)
		doc.status = SessionAttendance.STATUS.CANCELLED
		if (reasonId) doc.cancellation.reasonId = reasonId
		else if (reasonDesc) doc.cancellation.reasonDesc = reasonDesc
		return await doc.save()
	} catch (err) {
		console.log('SessionAttendance.findByOrderId: ', err)
	}
}
exports.findBySessionId = async (sessionId) => {
	try {
		return await sessionAttendanceModel.find({ sessionId: sessionId })
	} catch (err) {
		console.log('SessionAttendance.findBySessionId: ', err)
	}
} */
