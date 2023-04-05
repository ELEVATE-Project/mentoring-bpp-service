'use strict'

const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')
const bapModel = require('./model')

const findOne = async ({ where = {} }) => {
	try {
		console.log('FINE BAP: WHERE: ', where)
		const bap = await new Promise((resolve, reject) => {
			bapModel.findOne({ bapId: where.bapId }, (err, result) => {
				if (err) reject(err)
				else resolve(result)
			})
		})
		if (bap) return bap.toJSON()
		else return null
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		const bap = new bapModel({ bapId: data.bapId, id: client.uuid(), bapUri: data.bapUri })
		const result = await new Promise((resolve, reject) => {
			bap.save((err) => {
				if (err) reject(err)
				else resolve(bap)
			})
		})
		return result.toJSON()
	} catch (err) {
		console.log('CASSANDRA BAP CREATE: ', err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(defaults, where)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		const bap = await findOne({ where })
		if (bap) {
			bap.id = uuid.v4({ uuid: bap.id.buffer, format: 'hex' })
			return { bap, isNew: false }
		} else {
			const newBap = await create(defaults)
			newBap.id = uuid.v4({ uuid: newBap.id.buffer, format: 'hex' })
			return { bap: newBap, isNew: true }
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const bapQueries = { create, findOrCreate }
module.exports = bapQueries
/* exports.findByIds = async (ids) => {
	try {
		return await Bap.find({ _id: { $in: ids } }).lean()
	} catch (err) {
		console.log(err)
	}
} */
