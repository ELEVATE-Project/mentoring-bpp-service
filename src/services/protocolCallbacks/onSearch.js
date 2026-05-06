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
		console.log('OnSearch.ProtocolCallbacks.services: ')
		const catalog = response.catalog
		catalog.descriptor = descriptorBuilder()
		console.log('OnSearch.ProtocolCallbacks.services: ')

		const onSearchRequest = await onSearchRequestDTO(context, catalog)
		console.log('OnSearch.ProtocolCallbacks.services: ', callbackData)

		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_SEARCH_ROUTE,
			body: onSearchRequest,
		})

		console.log('OnSearch.ProtocolCallbacks.services: ')
	} catch (err) {
		console.error('ERROR OnSearch.ProtocolCallbacks.services:', err)
		//console.log('OnSearch.ProtocolCallbacks.services: ', err)
	}
}
