'use strict'

const client = require('@configs/cassandra')
console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY')

const idToBapIdModel = client.loadSchema('id_to_bap_id', {
	fields: {
		id: 'uuid',
		bapId: 'text',
	},
	key: ['id'],
})

idToBapIdModel.syncDB((err, result) => {
	if (err) {
		throw err
	} else console.log('ID_TO_BAPID Sync RESULT:', result)
})

module.exports = idToBapIdModel
