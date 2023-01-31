'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const findOrCreate = require('mongoose-findorcreate')
const { ObjectId } = require('mongodb')
const db = require('@configs/mongodb')
const crypto = require('crypto')

const STATUS = {
	ACTIVE: 0,
	COMPLETE: 1,
	CANCELLED: 2,
}

const STATUS_TEXT = Object.keys(STATUS).reduce((acc, key) => {
	acc[STATUS[key]] = key
	return acc
}, {})

console.log(STATUS_TEXT)

const sessionAttendanceSchema = new mongoose.Schema({
	userId: { type: ObjectId, ref: 'User' },
	sessionId: {
		type: ObjectId,
	},
	sessionAttendeeId: {
		type: ObjectId,
	},
	fulfillmentId: {
		type: String,
	},
	orderId: {
		type: String,
		default: () => crypto.randomUUID(),
	},
	status: {
		type: Number,
		required: true,
		default: STATUS.ACTIVE,
		min: Math.min(...Object.values(STATUS)),
		max: Math.max(...Object.values(STATUS)),
	},
})
sessionAttendanceSchema.plugin(mongooseLeanGetter)
sessionAttendanceSchema.plugin(findOrCreate)
sessionAttendanceSchema.plugin(mongooseLeanVirtuals)

sessionAttendanceSchema.virtual('statusText').get(function () {
	return STATUS_TEXT[this.status]
})

const model = db.model('SessionAttendance', sessionAttendanceSchema)

module.exports = model
