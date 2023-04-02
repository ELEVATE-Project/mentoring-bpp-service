'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const sessionAttendanceQueries = require('@database/storage/sessionAttendance/queries')
const userQueries = require('@database/storage/user/queries')
const bapQueries = require('@database/storage/bap/queries')
const crypto = require('crypto')

exports.session = async (requestBody) => {
	try {
		const sessionId = requestBody.sessionId
		const sessionAttendance = await sessionAttendanceQueries.findBySessionId(sessionId)
		if (!sessionAttendance) {
			return console.log('SessionAttendance Not Found')
		}
		const userIds = sessionAttendance.map((sessionAttendee) => sessionAttendee.userId)
		const users = await userQueries.findByIds(userIds)
		if (!users) {
			return console.log('Users Not Found')
		}
		const bapIds = users.map((user) => user.bapId)
		const baps = await bapQueries.findByIds(bapIds)
		if (!baps) {
			return console.log('BAP Not Found')
		}
		let usersWithBapAndAttendance = users.map((user) => {
			const bapInfo = baps.find((f) => f._id.toString() === user.bapId.toString())
			const sessionAttendanceInfo = sessionAttendance.find((f) => f.userId.toString() === user._id.toString())
			return {
				...user,
				bapInfo,
				sessionAttendanceInfo,
			}
		})
		usersWithBapAndAttendance.map(async (user) => {
			await protocolCallbacks.onUpdate({
				transactionId: crypto.randomUUID(),
				messageId: crypto.randomUUID(),
				bapId: user.bapInfo.bapId,
				bapUri: user.bapInfo.bapUri,
				status: user.sessionAttendanceInfo.statusText,
				sessionId: sessionId.toString(),
				fulfillmentId: user.sessionAttendanceInfo.fulfillmentId.toString(),
				orderId: user.sessionAttendanceInfo.orderId.toString(),
			})
		})
	} catch (err) {
		console.log(err)
	}
}
