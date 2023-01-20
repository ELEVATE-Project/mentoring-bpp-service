'use strict'
let mongoose = require('mongoose')
const mongoose_autopopulate = require('mongoose-autopopulate')
const mongoose_timestamp = require('mongoose-timestamp')

const initializeMongo = () => {
	let parameters = ''
	if (process.env.REPLICA_SET_NAME) {
		parameters = '?replicaSet=' + process.env.REPLICA_SET_NAME
		if (process.env.REPLICA_SET_READ_PREFERENCE)
			parameters += '&readPreference=' + process.env.REPLICA_SET_READ_PREFERENCE
	}

	const db = mongoose.createConnection(process.env.MONGODB_URL + parameters, {
		useNewUrlParser: true,
	})

	mongoose.plugin(mongoose_timestamp, {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	})

	mongoose.plugin(mongoose_autopopulate)
	return db
}

const mongo = initializeMongo()

mongo.on('error', (err) => {
	console.log('Mongo Connection Error: ', err)
	/*  logger.error('connection error:', {
        triggerNotification: true,
    }) */
})

mongo.on('open', () => {
	console.log('Mongodb Connected')
	/*logger.info('Connected to DB', {
        triggerNotification: true,
    })*/
})
exports.db = mongo
