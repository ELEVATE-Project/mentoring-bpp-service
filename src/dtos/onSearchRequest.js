'use strict'
const { faker } = require('@faker-js/faker')

const getDescriptor = (type, name) => {
	const descriptor = {
		short_desc: faker.lorem.sentence(5),
		long_desc: faker.lorem.sentences(2),
		additional_desc: {
			url: 'https://www.w3.org/2014/10/pv2/sample.html',
			content_type: 'text/html',
		},
		media: [
			{
				mimetype: 'temp',
				url: 'temp',
				signature: 'temp',
				dsa: 'temp',
			},
		],
	}
	if (type === 'bpp') {
		descriptor.name = process.env.BPP_NAME
		descriptor.code = process.env.BPP_CODE
		descriptor.images = [
			{
				url: 'https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png',
				size_type: 'md',
				width: '400',
				height: '200',
			},
		]
	} else if (type === 'provider') {
		return {
			name: name,
			code: name,
		}
	}
	return descriptor
}

const getContext = () => {
	return {
		domain: process.env.DOMAIN,
		action: 'on_search',
		bpp_id: process.env.BPP_ID,
		bpp_uri: process.env.BPP_URI,
		timestamp: new Date().toISOString(),
		bap_id: '',
		bap_uri: '',
	}
}

exports.onSearchRequest = (transactionId, messageId, catalogResponse, requestContext) => {
	catalogResponse.catalog.descriptor = getDescriptor('bpp')
	const context = getContext()
	context.bap_id = requestContext.bap_id
	context.bap_uri = requestContext.bap_uri
	context.transaction_id = transactionId
	context.message_id = messageId
	return {
		context,
		message: catalogResponse,
	}
}
