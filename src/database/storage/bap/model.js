'use strict'

const client = require('@configs/cassandra')

const bapModel = client.loadSchema('bap', {
	fields: {
		id: 'uuid',
		bapId: 'text',
		bapUri: 'text',
	},
	key: ['bapId'],
})

bapModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('BAP Sync RESULT:', result)
})

module.exports = bapModel
