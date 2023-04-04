'use strict'

const client = require('@configs/cassandra')

const orderIdToAttendanceModel = client.loadSchema('order_id_to_attendance', {
	fields: {
		orderId: 'uuid',
		attendanceId: 'uuid',
	},
	key: ['orderId'],
})

orderIdToAttendanceModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('ORDER_ID_TO_ATTENDANCE Sync Result: ', result)
})

module.exports = orderIdToAttendanceModel
