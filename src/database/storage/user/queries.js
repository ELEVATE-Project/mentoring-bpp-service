'use strict'

exports.create = async (data) => {
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
}
