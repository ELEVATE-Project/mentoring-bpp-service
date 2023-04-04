'use strict'

const client = require('@configs/cassandra')

const emailToUserModel = client.loadSchema('email_to_user', {
	fields: {
		email: 'text',
		bapId: 'uuid',
		userId: 'uuid',
	},
	key: ['email', 'bapId'],
})

emailToUserModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('email_to_user Sync Result: ', result)
})

module.exports = emailToUserModel
