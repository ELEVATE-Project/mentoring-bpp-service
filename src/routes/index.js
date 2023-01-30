'use strict'
const router = require('express').Router()
const bppController = require('@controllers/')
const { authVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier)
router.post('/search', bppController.search)
router.post('/select', bppController.select)
router.post('/init', bppController.init)
router.post('/confirm', bppController.confirm)
router.post('/cancel', bppController.cancel)
router.post('/status', bppController.status)

module.exports = router
