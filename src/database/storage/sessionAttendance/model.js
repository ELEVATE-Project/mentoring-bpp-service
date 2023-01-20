'use strict'
const mongoose = require('mongoose')
const mongooseLeanGetter = require('mongoose-lean-getters')
const { db } = require('@configs/mongodb')

const sessionAttendanceSchema = new mongoose.Schema({})
sessionAttendanceSchema.plugin(mongooseLeanGetter)

const model = db.model('baps', sessionAttendanceSchema)

module.exports = model
