'use strict'

const { onConfirm } = require('./onConfirm')
const { onSelect } = require('./onSelect')
const { onStatus } = require('./onStatus')
const { onCancel } = require('./onCancel')
const { onUpdate } = require('./onUpdate')
const { onSearch } = require('./onSearch')
const { onInit } = require('./onInit')

const protocolCallbacks = { onConfirm, onSelect, onStatus, onCancel, onSearch, onInit, onUpdate }
module.exports = protocolCallbacks
