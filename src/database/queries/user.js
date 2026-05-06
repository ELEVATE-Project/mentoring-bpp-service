'use strict'
const { User } = require('../models') // Adjust path as needed
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await User.create(data)
	} catch (err) {
		console.error(err)
	}
}

exports.findById = async (id) => {
	try {
		return await User.findByPk(id)
	} catch (err) {
		console.error('User.findById: ', err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw new Error('Where Clause Is Empty')

		const [user, isNew] = await User.findOrCreate({ where, defaults, raw: true})
		if (isNew) console.log('New User Entry Created')
		else console.log('Found Existing User')

		return { user, isNew }
	} catch (err) {
		console.error('User.findOrCreate: ', err)
		throw err
	}
}

exports.findByIds = async (ids) => {
	try {
		if (!ids || !Array.isArray(ids) || ids.length === 0) {
			throw new Error('User IDs array is required and cannot be empty')
		}
		
		return await User.findAll({
			where: {
				id: ids
			},
			raw: true
		})
	} catch (err) {
		console.error('User.findByIds: ', err)
		throw err
	}
}
