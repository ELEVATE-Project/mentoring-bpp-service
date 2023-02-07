'use strict'

const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { onSelectRequestDTO } = require('@dtos/onSelectRequest')
const { postRequest } = require('@utils/requester')

exports.onSelect = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_SELECT_ACTION
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
		await postRequest(callbackData.bapUri, process.env.ON_SELECT_ROUTE, {}, onSelectRequest, { shouldSign: true })
	} catch (err) {
		console.log('OnSelect.ProtocolCallbacks.services: ', err)
	}
}
