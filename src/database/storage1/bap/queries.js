'use strict'
const nano = require('@configs/couchdb')
const db = nano.use('bap')
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		await db.insert(data)
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
			return { bap: results.docs[0], isNew }
		} else {
			const insertResult = await db.insert(defaults)
			isNew = true
			console.log('New BAP Entry Created')
			console.log('INSERT RESULT: ', insertResult)
			return { bap: insertResult, isNew }
		}
	} catch (err) {
		console.log('BAP.findOrCreate: ', err)
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
