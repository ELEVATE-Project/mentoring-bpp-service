'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onUpdateRequestDTO } = require('@dtos/onUpdateRequest')
const { externalRequests } = require('@helpers/requests')
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
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_UPDATE_ROUTE,
			body: onUpdateRequest,
		})
	} catch (err) {
		console.log('OnUpdate.ProtocolCallbacks.services: ', err)
	}
}
