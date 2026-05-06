'use strict'
const { SessionAttendance } = require('../models') // Adjust path as needed
const { isEmpty } = require('@utils/generic')

exports.create = async (data) => {
	try {
		return await SessionAttendance.create(data)
	} catch (err) {
		console.error(err)
	}
}

exports.findOrCreate = async ({ where = {}, defaults = {} }) => {
	try {
		if (isEmpty(where)) throw new Error('Where Clause Is Empty')

		const [sessionAttendance, isNew] = await SessionAttendance.findOrCreate({
			where,
			defaults,
		})

		// Ensure the output is raw
		const result = sessionAttendance.get({ plain: true })

		if (isNew) console.log('New SessionAttendance Entry Created')
		else console.log('Found Existing SessionAttendance')

		return { sessionAttendance: result, isNew }
	} catch (err) {
		console.error('SessionAttendance.findOrCreate: ', err)
		throw err
	}
}

const findByField = async (field, value) => {
	try {
		return await SessionAttendance.findOne({ where: { [field]: value } })
	} catch (err) {
		console.error('SessionAttendance.findByField: ', err)
	}
}

exports.findByOrderId = async (orderId) => {
	try {
		return await findByField('order_id', orderId)
	} catch (err) {
		console.error('SessionAttendance.findByOrderId: ', err)
	}
}

exports.setStatusAsCancelledById = async (id, { reasonId, reasonDesc }) => {
	try {
		const sessionAttendance = await SessionAttendance.findByPk(id)
		if (!sessionAttendance) throw new Error('SessionAttendance not found')

		sessionAttendance.status = SessionAttendance.STATUS.CANCELLED

		if (reasonId) sessionAttendance.cancellation = { reasonId }
		else if (reasonDesc) sessionAttendance.cancellation = { reasonDesc }

		return await sessionAttendance.save()
	} catch (err) {
		console.error('SessionAttendance.setStatusAsCancelledById: ', err)
		throw err
	}
}
