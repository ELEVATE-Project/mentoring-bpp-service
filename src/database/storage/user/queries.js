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
			name: data.name,
			email: data.name,
			bapId: client.uuidFromString(data.bapId),
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

/* var query = {
    surname : { '$in': ['Doe','Smith'] },
}

models.instance.Person.find(query, {raw: true}, function(err, people){
    //people is an array of plain objects satisfying the query conditions above
}); */

const findByIds = async (ids) => {
	try {
		const users = await new Promise((resolve, reject) => {
			userModel.find({ id: { $in: ids } }, { raw: true }, (err, result) => {
				if (err) reject(err)
				else {
					if (result.length > 0) {
						for (const user of result) {
							user.id = uuid.v4({ uuid: user.id.buffer, format: 'hex' })
							user.bapId = uuid.v4({ uuid: user.bapId.buffer, format: 'hex' })
						}
						resolve(result)
					} else resolve([])
				}
			})
		})
		return users
	} catch (err) {
		console.log(err)
	}
}

const findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(defaults, where)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		const user = await findOne({ where })
		if (user) {
			user.id = uuid.v4({ uuid: user.id.buffer, format: 'hex' })
			user.bapId = uuid.v4({ uuid: user.bapId.buffer, format: 'hex' })
			return { user, isNew: false }
		} else {
			const newUser = await create(defaults)
			user.id = uuid.v4({ uuid: user.id.buffer, format: 'hex' })
			user.bapId = uuid.v4({ uuid: user.bapId.buffer, format: 'hex' })
			return { user: newUser, isNew: true }
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const userQueries = { findOrCreate, findOne, findByIds }
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
