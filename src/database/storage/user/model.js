'use strict'

const client = require('@configs/cassandra')

const userModel = client.loadSchema('user', {
	fields: {
		id: 'uuid',
		name: 'text',
		email: 'text',
		bapId: 'uuid',
	},
	key: ['id'],
})

userModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('USER Sync RESULT:', result)
})

module.exports = userModel
