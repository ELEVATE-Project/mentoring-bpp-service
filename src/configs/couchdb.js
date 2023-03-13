'use strict'

const nano = require('nano')('http://admin:password@couchdb1:5984')
const { enableClusterOnNode, addNodeToCluster, finishClusterSetup } = require('@configs/couchdbCluster')
const { couchDBRequests } = require('@helpers/requests')

const initializeDatabase = async (databaseName) => {
	try {
		await nano.db.create(databaseName)
		console.log(`'${databaseName}' created.`)
	} catch (err) {
		if (err?.error === 'file_exists') console.log(`Database '${databaseName}' already exists.`)
		else console.log(err)
	}
}

const initializeCouchDB = async () => {
	try {
		const bapDatabaseName = 'bap'
		const sessionAttendanceDatabaseName = 'session-attendance'
		const userDatabaseName = 'user'
		await initializeDatabase(bapDatabaseName)
		await initializeDatabase(sessionAttendanceDatabaseName)
		await initializeDatabase(userDatabaseName)
		await enableClusterOnNode('http://admin:password@couchdb1:5984', 'admin', 'password')
		await enableClusterOnNode('http://admin:password@couchdb2:5984', 'admin1', 'password1')
		await enableClusterOnNode('http://admin:password@couchdb3:5984', 'admin1', 'password1')
		//await addNodeToCluster('couchdb1', 5984, 'admin', 'password')
		await addNodeToCluster('172.16.238.12', 5984, 'admin', 'password')
		await addNodeToCluster('172.16.238.13', 5984, 'admin', 'password')
		console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
		await couchDBRequests.couchGET({ route: 'http://admin:password@couchdb1:5984' })
		console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
		await await finishClusterSetup()
	} catch (err) {
		console.log(err)
	}
}

initializeCouchDB()

module.exports = nano
