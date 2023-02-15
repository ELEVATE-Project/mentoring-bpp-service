'use strict'

const protocolCallbacks = require('@services/protocolCallbacks/')
const sessionAttendanceQueries = require('@database/storage/sessionAttendance/queries')
const userQueries = require('@database/storage/user/queries')
const bapQueries = require('@database/storage/bap/queries')
const crypto = require('crypto')

exports.session = async (requestBody) => {
	try {
		const sessionId = requestBody.sessionId
		const sessionAttendanceDoc = await sessionAttendanceQueries.findBySessionId(sessionId)
		if (!sessionAttendanceDoc) return console.log('SessionAttendance Not Found')
		const userIds = sessionAttendanceDoc.map((sessionAttendee) => {
			console.log(sessionAttendee.userId)
			return sessionAttendee.userId
		})
		const userDocs = await userQueries.findByIds(userIds)
		if (!userDocs) return console.log('Users Not Found')
		const bapIds = userDocs.map((user) => {
			console.log(user.bapId)
			return user.bapId
		})
		const bapDocs = await bapQueries.findByIds(bapIds)
		if (!bapDocs) return console.log('BAP Not Found')

		let usersWithBapMeta = userDocs.map((item) => ({
			...item,
			bapInfo: bapDocs.filter((f) => f._id.toString() == item.bapId.toString()),
			sessionAttendance: sessionAttendanceDoc.filter((f) => f.userId.toString() == item._id.toString()),
		}))

		usersWithBapMeta.map(async function (user) {
			await protocolCallbacks.onUpdate({
				transactionId: crypto.randomUUID(),
				messageId: crypto.randomUUID(),
				bapId: user.bapInfo[0].bapId,
				bapUri: user.bapInfo[0].bapUri,
				status: user.sessionAttendance[0].statusText,
				sessionId: sessionId.toString(),
				fulfillmentId: user.sessionAttendance[0].fulfillmentId.toString(),
				orderId: user.sessionAttendance[0].orderId.toString(),
			})
		})
	} catch (err) {
		console.log(err)
	}
}
