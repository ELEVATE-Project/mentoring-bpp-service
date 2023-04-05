'use strict'

const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')
const emailToUserModel = require('./model')

const findOne = async ({ where = {} }) => {
	try {
		const emailToUser = await new Promise((resolve, reject) => {
			emailToUserModel.findOne({ email: where.email, bapId: where.bapId }, (err, result) => {
				if (err) reject(err)
				else resolve(result)
			})
		})
		if (emailToUser) return emailToUser.toJSON()
		else return null
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		const emailToUser = new emailToUserModel({ email: data.email, bapId: data.bapId, userId: data.userId })
		const result = await new Promise((resolve, reject) => {
			emailToUser.save((err) => {
				if (err) reject(err)
				else resolve(emailToUser)
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
		const emailToUser = await findOne({ where })
		if (emailToUser) {
			emailToUser.bapId = uuid.v4({ uuid: emailToUser.bapId.buffer, format: 'hex' })
			emailToUser.userId = uuid.v4({ uuid: emailToUser.userId.buffer, format: 'hex' })
			return { emailToUser, isNew: false }
		} else {
			const newEmailToUser = await create(defaults)
			newEmailToUser.bapId = uuid.v4({ uuid: newEmailToUser.bapId.buffer, format: 'hex' })
			newEmailToUser.userId = uuid.v4({ uuid: newEmailToUser.userId.buffer, format: 'hex' })
			return { emailToUser: newEmailToUser, isNew: true }
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const emailToUserQueries = { create, findOrCreate }
module.exports = emailToUserQueries
