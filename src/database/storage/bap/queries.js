'use strict'
const Bap = require('./model')
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await new Bap(data).save()
	} catch (err) {
		console.log(err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		defaults = Object.assign(where, defaults)
		if (isEmpty(where)) throw 'Where Clause Is Empty'
		return await new Promise((resolve, reject) => {
			Bap.findOrCreate(where, defaults, (err, bap, isNew) => {
				if (err) reject(err)
				if (isNew) console.log('New BAP Entry Created')
				else console.log('Found Existing BAP')
				resolve({ bap, isNew })
			})
		})
	} catch (err) {
		console.log('BAP.findOrCreate: ', err)
		throw err
	}
}
