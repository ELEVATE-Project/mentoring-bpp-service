'use strict'

const { onConfirm } = require('./onConfirm')
const { onSelect } = require('./onSelect')
const { onStatus } = require('./onStatus')
const { onCancel } = require('./onCancel')
const { onSearch } = require('./onSearch')
const protocolCallbacks = { onConfirm, onSelect, onStatus, onCancel, onSearch }
module.exports = protocolCallbacks
