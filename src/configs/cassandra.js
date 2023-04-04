'use strict'
const { createClient } = require('express-cassandra')

const clientConfig = {
	clientOptions: {
		contactPoints: ['cassandra'],
		protocolOptions: { port: 9042 },
		keyspace: 'dsep_mentoring',
		localDataCenter: 'datacenter1',
	},
	ormOptions: {
		defaultReplicationStrategy: {
			class: 'SimpleStrategy',
			replication_factor: 1,
		},
		migration: 'safe',
		udts: {
			cancellation: {
				reasonId: 'int',
				reasonDesc: 'text',
			},
		},
	},
}

const client = createClient(clientConfig)
module.exports = client
