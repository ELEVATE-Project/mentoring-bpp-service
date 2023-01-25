'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const findOrCreate = require('mongoose-findorcreate')
const { ObjectId } = require('mongodb')
const db = require('@configs/mongodb')
const crypto = require('crypto')

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
	isActive: { type: Boolean, default: true },
})
sessionAttendanceSchema.plugin(mongooseLeanGetter)
sessionAttendanceSchema.plugin(findOrCreate)

const model = db.model('SessionAttendance', sessionAttendanceSchema)

module.exports = model
