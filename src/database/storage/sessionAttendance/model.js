'use strict'

const client = require('@configs/cassandra')

const sessionAttendanceModel = client.loadSchema('session_attendance', {
	fields: {
		id: 'uuid',
		userId: 'uuid',
		sessionId: 'uuid',
		sessionAttendeeId: 'uuid',
		orderId: 'uuid',
		status: 'int',
		cancellation: { type: 'frozen', typeDef: '<cancellation>' },
		fulfillmentId: 'text',
	},
	key: ['id'],
})

sessionAttendanceModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('SESSION_ATTENDANCE Sync RESULT:', result)
})

module.exports = sessionAttendanceModel
