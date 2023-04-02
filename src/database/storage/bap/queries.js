'use strict'

const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')

const select = async ({ where = {} }) => {
	try {
		let selectQuery = 'SELECT * FROM bap WHERE '
		const whereFields = Object.keys(where)
		whereFields.forEach((field, index) => {
			if (index > 0) selectQuery += ' and '
			selectQuery += `${field} = '${where[field]}'`
		})
		selectQuery += ';'
		console.log('SELECT QUERY: ', selectQuery)
		const selectResult = await client.execute(selectQuery)
		console.log('SELECT SELECTRESULT: ', selectResult)
		return selectResult
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		const query = 'INSERT INTO bap (bapId, id, bapUri) VALUES (?,?,?)'
		const params = [data.bapId, uuid.v4(), data.bapUri]
		console.log(params)
		await client.execute(query, params, { prepare: true })
		const selectResult = await select({ where: { bapId: data.bapId } })
		return selectResult.rows[0]
	} catch (err) {
		console.log('CASSANDRA BAP CREATE: ', err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(defaults, where)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		const selectResult = await select({ where })
		if (selectResult.rows.length === 0) {
			console.log('DEFAULTS: ', defaults)
			const newBap = await create(defaults)
			console.log('NEW BAP: ', newBap)
			newBap.id = newBap.id.buffer.toString('hex')
			return { bap: newBap, isNew: true }
		} else {
			console.log(selectResult.rows[0])
			const bap = selectResult.rows[0]
			console.log('CURRENT BAP: ', bap)
			bap.id = bap.id.buffer.toString('hex')
			return { bap: selectResult.rows[0], isNew: false }
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const bapQueries = { create, findOrCreate }
module.exports = bapQueries
exports.findByIds = async (ids) => {
	try {
		return await Bap.find({ _id: { $in: ids } }).lean()
	} catch (err) {
		console.log(err)
	}
}
