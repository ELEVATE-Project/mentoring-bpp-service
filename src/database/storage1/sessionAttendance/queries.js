'use strict'
const { isEmpty } = require('@utils/generic')
const nano = require('@configs/couchdb')
const db = nano.use('session-attendance')

exports.create = async (data) => {
	try {
		const insertResult = await db.insert(data)
		return await db.get(insertResult.id)
	} catch (err) {
		console.log(err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'

		let isNew
		const results = await db.find({ selector: where })
		if (results.docs.length > 0) {
			isNew = false
			console.log('Found Existing BAP')
			console.log(results.docs[0])
			return { bap: results.docs[0], isNew }
		} else {
			const insertResult = await db.insert(defaults)
			const doc = await db.get(insertResult.id)
			isNew = true
			console.log('New BAP Entry Created')
			console.log('Doc: ', doc)
			return { bap: doc, isNew }
		}
	} catch (err) {
		console.log('SessionAttendance.findOrCreate: ', err)
		throw err
	}
}

const findByField = async (field, value) => {
	try {
		const selector = {
			[field]: value,
		}
		const results = await db.find({ selector: selector })
		if (results.docs.length === 0) return null
		else results.docs[0]
	} catch (err) {
		console.log('SessionAttendance.findByField: ', err)
	}
}

exports.findByOrderId = async (orderId) => {
	try {
		return await findByField('orderId', orderId)
	} catch (err) {
		console.log('SessionAttendance.findByOrderId: ', err)
	}
}

exports.setStatusAsCancelledById = async (id, { reasonId, reasonDesc }) => {
	try {
		const doc = await db.get(id)
		doc.status = 'CANCELLED'
		if (reasonId) doc.cancellation.reasonId = reasonId
		else if (reasonDesc) doc.cancellation.reasonDesc = reasonDesc
		const updateResult = await db.insert(doc, doc._id)
		return await db.get(updateResult)
	} catch (err) {
		console.log('SessionAttendance.findByOrderId: ', err)
	}
}
exports.findBySessionId = async (sessionId) => {
	try {
		return await findByField('sessionId', sessionId)
	} catch (err) {
		console.log('SessionAttendance.findBySessionId: ', err)
	}
}
