'use strict'
const { isEmpty } = require('@utils/generic')
const nano = require('@configs/couchdb')
const db = nano.use('user')

exports.create = async (data) => {
	try {
		const insertResult = await db.insert(data)
		return await db.get(insertResult.id)
	} catch (err) {
		console.log(err)
	}
}

exports.findById = async (id) => {
	try {
		return await db.get(id)
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
			console.log('Found Existing User')
			console.log(results.docs[0])
			return { user: results.docs[0], isNew }
		} else {
			const insertResult = await db.insert(defaults)
			const doc = await db.get(insertResult.id)
			isNew = true
			console.log('New User Entry Created')
			console.log('Doc: ', doc)
			return { user: doc, isNew }
		}
	} catch (err) {
		console.log('User.findOrCreate: ', err)
		throw err
	}
}

exports.findByIds = async (ids) => {
	try {
		const result = await db.fetch({ keys: ids })
		return result.rows.map((row) => row.doc)
	} catch (err) {
		console.log(err)
	}
}
