'use strict'

const client = require('@configs/cassandra')
const idToBapIdModel = require('./model')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')

const findOne = async ({ where = {} }) => {
	try {
		const idToBapId = await new Promise((resolve, reject) => {
			idToBapIdModel.findOne({ id: client.uuidFromString(where.id) }, (err, result) => {
				if (err) reject(err)
				else resolve(result)
			})
		})
		if (idToBapId) return idToBapId.toJSON()
		else return null
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		const idToBapId = new idToBapIdModel({ id: client.uuidFromString(data.id), bapId: data.bapId })
		const result = await new Promise((resolve, reject) => {
			idToBapId.save((err) => {
				if (err) reject(err)
				else resolve(idToBapId)
			})
		})
		return result.toJSON()
	} catch (err) {
		console.log('CASSANDRA idToBapId CREATE: ', err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(defaults, where)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		const idToBapId = await findOne({ where })
		if (idToBapId) {
			idToBapId.id = uuid.v4({ uuid: idToBapId.id.buffer, format: 'hex' })
			return { idToBapId, isNew: false }
		} else {
			const newIdToBapId = await create(defaults)
			newIdToBapId.id = uuid.v4({ uuid: newIdToBapId.id.buffer, format: 'hex' })
			return { idToBapId: newIdToBapId, isNew: true }
		}
	} catch (err) {
		console.log('CASSANDRA idToBapId FINDORCREATE: ', err)
	}
}

const idToBapIdQueries = { create, findOne, findOrCreate }
module.exports = idToBapIdQueries
