'use strict'
const router = require('express').Router()
const bpp = require('@controllers/')

router.post('/search', bpp.search)
router.post('/init', bpp.init)
router.post('/confirm', bpp.confirm)

module.exports = router
