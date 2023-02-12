'use strict'
const { verifyHeader } = require('@utils/auth')

const unauthenticatedResponse = (message, res) => {
	res.status(401).json({
		message: {
			ack: {
				status: 'NACK',
			},
		},
		error: {
			message,
		},
	})
}

exports.authVerifier = async (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'] || false
		const proxyHeader = req.headers['x-gateway-authorization'] || false
		const authEnabled = process.env.AUTH_ENABLED === 'false' ? false : true
		/* console.log(authHeader)
		console.log(proxyHeader) */
		if (authEnabled) {
			let proxyVerified = false
			if (!authHeader) return unauthenticatedResponse('Authentication Failed', res)
			if (req.body.context.action === 'search' && process.env.DISABLE_PROXY_AUTH !== 'true') {
				if (proxyHeader) proxyVerified = await verifyHeader(proxyHeader, req, res)
				else return unauthenticatedResponse('Proxy Authentication Failed', res)
			} else proxyVerified = true
			let authVerified = await verifyHeader(authHeader, req, res)
			if (authVerified && proxyVerified) {
				console.log('AUTHENTICATED')
				next()
			} else {
				console.log('AUTHENTICATION FAILED')
				return unauthenticatedResponse('Authentication Failed', res)
			}
		} else next()
	} catch (err) {
		console.log(err)
	}
}
