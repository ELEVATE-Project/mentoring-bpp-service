'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
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

const model = db.model('Bap', bapSchema)

module.exports = model
