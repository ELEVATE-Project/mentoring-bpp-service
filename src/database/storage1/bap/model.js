'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const findOrCreate = require('mongoose-findorcreate')
const db = require('@configs/mongodb')

const bapSchema = new mongoose.Schema({
	bapId: {
		type: String,
		required: true,
	},
	bapUri: {
		type: String,
		required: true,
	},
})
bapSchema.plugin(mongooseLeanGetter)
bapSchema.plugin(findOrCreate)

const model = db.model('Bap', bapSchema)

module.exports = model
