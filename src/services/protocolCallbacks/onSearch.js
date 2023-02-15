'use strict'

const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { descriptorBuilder } = require('@utils/descriptorBuilder')
const { onSearchRequestDTO } = require('@dtos/onSearchRequest')
const { externalRequests } = require('@helpers/requests')

exports.onSearch = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_SEARCH_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		const response = await internalRequests.catalogPOST({
			body: callbackData.message,
			route: process.env.CATALOG_SEARCH_ROUTE,
		})
		const catalog = response.catalog
		catalog.descriptor = descriptorBuilder()
		const onSearchRequest = await onSearchRequestDTO(context, catalog)
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_SEARCH_ROUTE,
			body: onSearchRequest,
		})
	} catch (err) {
		console.log('OnSearch.ProtocolCallbacks.services: ', err)
	}
}
