'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const { db } = require('@configs/mongodb')

const userSchema = new mongoose.Schema({})
userSchema.plugin(mongooseLeanGetter)

const model = db.model('baps', userSchema)

module.exports = model
