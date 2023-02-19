'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onInitRequestDTO } = require('@dtos/onInitRequest')
const { internalRequests } = require('@helpers/requests')
//const crypto = require('crypto')
const { externalRequests } = require('@helpers/requests')
const { onSelectRequestDTO } = require('@dtos/onSelectRequest')

exports.onInit = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_INIT_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		const response = await internalRequests.catalogGET({
			route: process.env.CATALOG_GET_SESSION_ROUTE,
			pathParams: {
				sessionId: callbackData.sessionId,
			},
			queryParams: {
				getAllComponents: true,
			},
		})
		const session = response.session
		const onInitRequest = await onSelectRequestDTO(context, session.providers[0]) //This is a temporary solution for compliance with Unified BAP team. Should be changed as early as possible.
		onInitRequest.message.order.provider.fulfillments[0].customer = callbackData.customer
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_INIT_ROUTE,
			body: onInitRequest,
		})
	} catch (err) {
		console.log('OnSearch.ProtocolCallbacks.services: ', err)
	}
}
