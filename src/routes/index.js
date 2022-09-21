'use strict'
const router = require('express').Router()
const bpp = require('@controllers/')

router.post('/search', bpp.search)

module.exports = router
