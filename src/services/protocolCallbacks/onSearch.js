'use strict'

const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { descriptorBuilder } = require('@utils/descriptorBuilder')

exports.onSearch = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_SEARCH_ACTION
		)
		const response = await internalRequests.catalogPOST({
			body: callbackData.message,
			route: process.env.CATALOG_SEARCH_ROUTE,
		})
		const catalog = response.catalog
		catalog.descriptor = descriptorBuilder()
		console.log('BODY: ', JSON.stringify(catalog, null, 2))
	} catch (err) {
		console.log('OnSearch.ProtocolCallbacks.services: ', err)
	}
}
