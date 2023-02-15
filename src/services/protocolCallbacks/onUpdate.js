'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onUpdateRequestDTO } = require('@dtos/onUpdateRequest')
const { postRequest } = require('@utils/requester')
const { internalRequests } = require('@helpers/requests')

exports.onUpdate = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_UPDATE_ACTION
		)
		const response = await internalRequests.catalogGET({
			route: process.env.CATALOG_GET_STATUS_BODY_ROUTE,
			pathParams: {
				sessionId: callbackData.sessionId,
				fulfillmentId: callbackData.fulfillmentId,
			},
		})
		const statusBody = response.statusBody
		const onUpdateRequest = await onUpdateRequestDTO(
			context,
			statusBody.providers[0],
			callbackData.orderId,
			callbackData.status
		)
		await postRequest(callbackData.bapUri, process.env.ON_UPDATE_ROUTE, {}, onUpdateRequest, { shouldSign: false })
	} catch (err) {
		console.log('OnUpdate.ProtocolCallbacks.services: ', err)
	}
}
