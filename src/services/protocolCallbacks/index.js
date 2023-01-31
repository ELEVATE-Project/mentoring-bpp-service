'use strict'

const { onConfirm } = require('./onConfirm')
const { onSelect } = require('./onSelect')
const { onStatus } = require('./onStatus')
const protocolCallbacks = { onConfirm, onSelect, onStatus }
module.exports = protocolCallbacks
