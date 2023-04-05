'use strict'

const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')
const userIdToAttendanceModel = require('./model')

const findOne = async ({ where = {} }) => {
	try {
		const bap = await new Promise((resolve, reject) => {
			userIdToAttendanceModel.findOne({ bapId: where.bapId }, (err, result) => {
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
		const bap = new userIdToAttendanceModel({ bapId: data.bapId, id: client.uuid(), bapUri: data.bapUri })
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

const userIdToAttendanceQueries = { create, findOrCreate }
module.exports = userIdToAttendanceQueries
