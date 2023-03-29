'use strict'
const { Client } = require('cassandra-driver')

const client = new Client({
	contactPoints: ['cassandra'],
	localDataCenter: 'datacenter1',
	keyspace: 'dsep_mentoring',
})

client.connect((err) => {
	if (err) throw err
	console.log('Connected to Cassandra cluster')
})

module.exports = client
