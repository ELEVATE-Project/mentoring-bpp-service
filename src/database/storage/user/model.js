'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const { ObjectId } = require('mongodb')
const db = require('@configs/mongodb')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	bapId: {
		type: ObjectId,
		required: true,
	},
})
userSchema.plugin(mongooseLeanGetter)
userSchema.index({ email: 1, bapId: 1 }, { unique: true })

const model = db.model('User', userSchema)

module.exports = model
