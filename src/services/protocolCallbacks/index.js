'use strict'

const { onConfirm } = require('./onConfirm')
const { onSelect } = require('./onSelect')
const protocolCallbacks = { onConfirm, onSelect }
module.exports = protocolCallbacks
