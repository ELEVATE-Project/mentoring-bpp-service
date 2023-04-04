'use strict'

const client = require('@configs/cassandra')

const userIdToAttendanceModel = client.loadSchema('user_id_to_attendance', {
	fields: {
		userId: 'uuid',
		sessionId: 'uuid',
		fulfillmentId: 'uuid',
		attendanceId: 'uuid',
	},
	key: ['sessionId', 'userId', 'fulfillmentId'],
})

userIdToAttendanceModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('USER_ID_TO_ATTENDANCE Sync RESULT: ', result)
})

module.exports = userIdToAttendanceModel
