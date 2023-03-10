'use strict'

const nano = require('nano')('http://admin:password@couchdb1:5984')
const { enableClusterOnNode, addNodeToCluster, finishClusterSetup } = require('@configs/couchdbCluster')

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
		await enableClusterOnNode('http://admin:password@couchdb2:5984', 'admin', 'password')
		await enableClusterOnNode('http://admin:password@couchdb3:5984', 'admin', 'password')
		await addNodeToCluster('couchdb1', 5984, 'admin', 'password')
		await addNodeToCluster('couchdb2', 5984, 'admin', 'password')
		await addNodeToCluster('couchdb3', 5984, 'admin', 'password')
		await finishClusterSetup()
	} catch (err) {
		console.log(err)
	}
}

initializeCouchDB()

module.exports = nano
