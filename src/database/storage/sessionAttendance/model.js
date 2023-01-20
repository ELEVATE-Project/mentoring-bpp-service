'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const { ObjectId } = require('mongodb')
const db = require('@configs/mongodb')

const sessionAttendanceSchema = new mongoose.Schema({
	userId: { type: ObjectId, ref: 'User' },
	sessionId: {
		type: ObjectId,
	},
	sessionAttendeeId: {
		type: ObjectId,
	},
	isActive: { type: Boolean, default: true },
})
sessionAttendanceSchema.plugin(mongooseLeanGetter)

const model = db.model('SessionAttendance', sessionAttendanceSchema)

module.exports = model
