'use strict'

const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { onSelectRequestDTO } = require('@dtos/onSelectRequest')
const { externalRequests } = require('@helpers/requests')

exports.onSelect = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_SELECT_ACTION,
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
		const onSelectRequest = await onSelectRequestDTO(context, session.providers[0])
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_SELECT_ROUTE,
			body: onSelectRequest,
		})
	} catch (err) {
		console.log('OnSelect.ProtocolCallbacks.services: ', err)
	}
}
