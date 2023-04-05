'use strict'

const client = require('@configs/cassandra')
const { isEmpty } = require('@utils/generic')
const uuid = require('uuid')
const orderIdToAttendanceModel = require('./model')

const findOne = async ({ where = {} }) => {
	try {
		const orderIdToAttendance = await new Promise((resolve, reject) => {
			orderIdToAttendanceModel.findOne({ orderId: where.orderId }, (err, result) => {
				if (err) reject(err)
				else resolve(result)
			})
		})
		if (orderIdToAttendance) return orderIdToAttendance.toJSON()
		else return null
	} catch (err) {
		console.log(err)
	}
}

const create = async (data) => {
	try {
		const orderIdToAttendance = new orderIdToAttendanceModel({
			orderId: data.orderId,
			attendanceId: data.attendanceId,
		})
		const result = await new Promise((resolve, reject) => {
			orderIdToAttendance.save((err) => {
				if (err) reject(err)
				else resolve(orderIdToAttendance)
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
		const orderIdToAttendance = await findOne({ where })
		if (orderIdToAttendance) {
			orderIdToAttendance.orderId = uuid.v4({ uuid: orderIdToAttendance.orderId.buffer, format: 'hex' })
			orderIdToAttendance.attendanceId = uuid.v4({ uuid: orderIdToAttendance.attendanceId.buffer, format: 'hex' })
			return { orderIdToAttendance, isNew: false }
		} else {
			const newOrderIdToAttendance = await create(defaults)
			newOrderIdToAttendance.orderId = uuid.v4({ uuid: newOrderIdToAttendance.orderId.buffer, format: 'hex' })
			newOrderIdToAttendance.attendanceId = uuid.v4({
				uuid: newOrderIdToAttendance.attendanceId.buffer,
				format: 'hex',
			})
			return { orderIdToAttendance: newOrderIdToAttendance, isNew: true }
		}
	} catch (err) {
		console.log('CASSANDRA BAP FINDORCREATE: ', err)
	}
}

const orderIdToAttendanceQueries = { create, findOrCreate }
module.exports = orderIdToAttendanceQueries
