'use strict'
const cassandra = require('cassandra-driver')

const createKeySpace = async () => {
	const client = new cassandra.Client({ contactPoints: ['cassandra'], localDataCenter: 'datacenter1' })
	try {
		const query =
			"CREATE KEYSPACE dsep_mentoring WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'}"
		const result = await client.execute(query)
		console.log('Keyspace Created: ', result)
	} catch (err) {
		console.log('SCRIPT')
		console.log(err)
	} finally {
		client.shutdown()
	}
}

const createBapTable = async () => {
	const client = new cassandra.Client({
		contactPoints: ['cassandra'],
		localDataCenter: 'datacenter1',
		keyspace: 'dsep_mentoring',
	})
	try {
		const query = `CREATE TABLE bap (
            id UUID,
            bapId text,
            bapUri text,
            PRIMARY KEY((id), bapId)
        )`
		const result = await client.execute(query)
		console.log('Table Created: bap')
		console.log(result)
	} catch (err) {
		console.log('CREATE BAP TABLE: ', err)
	} finally {
		client.shutdown()
	}
}

const createSessionAttendanceTable = async () => {
	const client = new cassandra.Client({
		contactPoints: ['cassandra'],
		localDataCenter: 'datacenter1',
		keyspace: 'dsep_mentoring',
	})
	try {
		const createCancellationTypeQuery = `
        CREATE TYPE IF NOT EXISTS cancellation (
            reasonId int,
            reasonDesc text
        )`
		const typeQueryResult = await client.execute(createCancellationTypeQuery)
		console.log('RULESET:', typeQueryResult)
		const query = `CREATE TABLE session_attendance ( id UUID, userId UUID, sessionId UUID, sessionAttendeeId UUID, orderId UUID, status int, cancellation frozen<cancellation>, PRIMARY KEY(id, sessionId, userId))`
		const result = await client.execute(query)
		console.log('Table Created: session_attendance')
		console.log(result)
	} catch (err) {
		console.log('CREATE SESSION ATTENDANCE TABLE: ', err)
	} finally {
		client.shutdown()
	}
}

const createUserTable = async () => {
	const client = new cassandra.Client({
		contactPoints: ['cassandra'],
		localDataCenter: 'datacenter1',
		keyspace: 'dsep_mentoring',
	})
	try {
		const query = `CREATE TABLE user ( id UUID, name text, email text, bapId UUID, PRIMARY KEY((id), email, bapId) )`
		const result = await client.execute(query)
		console.log('Table Created: user')
		console.log(result)
	} catch (err) {
		console.log('CREATE USER TABLE: ', err)
	} finally {
		client.shutdown()
	}
}

//createKeySpace()
/* createBapTable()
createSessionAttendanceTable()
createUserTable() */
