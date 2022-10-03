'use strict'
const router = require('express').Router()
const bpp = require('@controllers/')

router.post('/search', bpp.search)
router.post('/init', bpp.init)
router.post('/confirm', bpp.confirm)
router.post('/cancel', bpp.cancel)
router.post('/status', bpp.status)

module.exports = router
