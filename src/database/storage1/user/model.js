'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const findOrCreate = require('mongoose-findorcreate')
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
userSchema.plugin(findOrCreate)

const model = db.model('User', userSchema)

module.exports = model
