'use strict'
const userModel = require('./model')
const uuid = require('uuid')
const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')

const create = async (data) => {
	try {
		console.log('CREATE DATA: ', data)
		const user = new userModel({
			id: client.uuid(),
			bapUri: data.bapUri,
		})
		const result = await new Promise((resolve, reject) => {
			user.save((err) => {
				if (err) reject(err)
				else resolve(user)
			})
		})
		console.log('CREATE RESULT: ', result.toJSON())
		return result.toJSON()
	} catch (err) {
		console.log('CASSANDRA sessionAttendance CREATE: ', err)
	}
}

const findOne = async ({ where = {} }) => {
	try {
		console.log('SELECT WHERE: ', where)
		const user = await new Promise((resolve, reject) => {
			userModel.findOne({ id: where.id }, (err, result) => {
				console.log('CALLBACK')
				if (err) reject(err)
				else resolve(result)
			})
		})
		if (user) return user.toJSON()
		else return null
	} catch (err) {
		console.log(err)
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

const userQueries = { findOrCreate, findOne }
module.exports = userQueries

/* exports.create = async (data) => {
	try {
		return await new User(data).save()
	} catch (err) {
		console.log(err)
	}
}

exports.findById = async (id) => {
	try {
		return await User.findById(id).lean()
	} catch (err) {
		console.log(err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		return await new Promise((resolve, reject) => {
			User.findOrCreate(where, defaults, (err, user, isNew) => {
				if (err) reject(err)
				if (isNew) console.log('New User Entry Created')
				else console.log('Found Existing User')
				resolve({ user, isNew })
			})
		})
	} catch (err) {
		console.log('User.findOrCreate: ', err)
		throw err
	}
}

exports.findByIds = async (ids) => {
	try {
		return await User.find({ _id: { $in: ids } }).lean()
	} catch (err) {
		console.log(err)
	}
} */
