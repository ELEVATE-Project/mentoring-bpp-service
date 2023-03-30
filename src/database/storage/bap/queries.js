'use strict'

const client = require('@configs/cassandra')
const crypto = require('crypto')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')

const select = async (where = {}) => {
	try {
		let selectQuery = 'SELECT * FROM bap WHERE '
		const whereFields = Object.keys(where)
		whereFields.forEach((field, index) => {
			if (index > 0) selectQuery += ' and '
			selectQuery += `${field} = '${where[field]}'`
		})
		selectQuery += ';'
		const selectResult = await client.execute(selectQuery)
		return selectResult.rows
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		const query = 'INSERT INTO bap (bapId, id, bapUri) VALUES (?,?,?)'
		const params = [data.bapId, crypto.randomUUID(), data.bapUri]
		console.log(params)
		const result = await client.execute(query, params, { prepare: true })

		console.log(result)
		console.log('FIRST ROW:', result.rows[0])
		return result.rows[0]
	} catch (err) {
		console.log('CASSANDRA BAP CREATE: ', err)
	}
}

//In findOrCreate, if a find is successful, do we update with defaults?
const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(defaults, where)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		let selectQuery = 'SELECT * FROM bap WHERE '
		console.log('WHERE: ', where)
		const whereFields = Object.keys(where)
		console.log(whereFields)
		whereFields.forEach((field, index) => {
			if (index > 0) selectQuery += ' and '
			selectQuery += `${field} = '${where[field]}'`
		})
		selectQuery += ';'
		console.log('SELECT QUERY: ', selectQuery)
		const selectResult = await client.execute(selectQuery)
		console.log(selectResult)
		if (selectResult.rows.length === 0) {
			console.log('DEFAULTS: ', defaults)
			const newBap = await create(defaults)
			console.log('NEW BAP: ', newBap)
			newBap.id = newBap.id.buffer.toString('hex')
			return { bap: newBap, isNew: true }
		} else {
			console.log(selectResult.rows[0])
			const bap = selectResult.rows[0]
			bap.id = bap.id.buffer.toString('hex')
			return { bap: selectResult.rows[0], isNew: false }
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const bapQueries = { create, findOrCreate }
module.exports = bapQueries
