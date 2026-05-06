'use strict'
const router = require('express').Router()
const bppController = require('@controllers/')
const { authVerifier, internalAuthVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier)
router.post('/search', bppController.search)
router.post('/select', bppController.select)
router.post('/init', bppController.init)
router.post('/confirm', bppController.confirm)
/* router.post('/cancel', bppController.cancel)
router.post('/status', bppController.status) */

// Internal APIs with internal authentication
router.use(internalAuthVerifier) // Applies only to `/internal/*` routes

router.post('/internal/users', bppController.getUserDetails)

module.exports = router
