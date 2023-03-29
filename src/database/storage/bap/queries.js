'use strict'

const client = require('@configs/cassandra')
const crypto = require('crypto')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		const query = 'INSERT INTO bap (id, bapId, bapUri) VALUES (?,?,?)'
		const params = [crypto.randomUUID(), data.bapId, data.bapUri]
		const result = await client.execute(query, params, { prepare: true })
		console.log(result.first())
		return result.first()
	} catch (err) {
		console.log('CASSANDRA BAP CREATE: ', err)
	}
}

//In findOrCreate, if a find is successful, do we update with defaults?
const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		let selectQuery = `SELECT * FROM bap WHERE bapId = '${where.bapId}'`
		const whereFields = Object.keys(where)
		console.log(whereFields)
		/* whereFields.forEach((field, index) => {
			if (index > 0) selectQuery += ' and '
			selectQuery += `${field} = '${where[field]}'`
		}) */
		selectQuery += ';'
		console.log('SELECT QUERY: ', selectQuery)
		const selectResult = await client.execute(selectQuery)
		console.log(selectResult)
		if (selectResult.rows.length === 0) return create(defaults)
		else {
			console.log(selectResult.rows[0])
			return selectResult.rows[0]
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const bapQueries = { create, findOrCreate }
module.exports = bapQueries
