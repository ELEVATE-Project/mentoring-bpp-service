'use strict'

const { onConfirm } = require('./onConfirm')
const { onSelect } = require('./onSelect')
const { onStatus } = require('./onStatus')
const { onCancel } = require('./onCancel')
const protocolCallbacks = { onConfirm, onSelect, onStatus, onCancel }
module.exports = protocolCallbacks
