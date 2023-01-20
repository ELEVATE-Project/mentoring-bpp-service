'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const { db } = require('@configs/mongodb')

const bapSchema = new mongoose.Schema({})
bapSchema.plugin(mongooseLeanGetter)

const model = db.model('baps', bapSchema)

module.exports = model
