'use strict'
const { raw } = require('express')
const { Bap } = require('../models') // Adjust path as needed
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await Bap.create(data)
	} catch (err) {
		console.error(err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw new Error('Where Clause Is Empty')

		const [bap, isNew] = await Bap.findOrCreate({ where, defaults, raw: true })
		if (isNew) console.log('New BAP Entry Created')
		else console.log('Found Existing BAP')

		return { bap, isNew }
	} catch (err) {
		console.error('BAP.findOrCreate: ', err)
		throw err
	}
}
