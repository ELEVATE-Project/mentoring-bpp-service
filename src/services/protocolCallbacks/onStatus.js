'use strict'

const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { onStatusRequestDTO } = require('@dtos/onStatusRequest')
const { externalRequests } = require('@helpers/requests')

exports.onStatus = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_STATUS_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		const response = await internalRequests.catalogGET({
			route: process.env.CATALOG_GET_STATUS_BODY_ROUTE,
			pathParams: {
				sessionId: callbackData.sessionId,
				fulfillmentId: callbackData.fulfillmentId,
			},
		})
		const statusBody = response.statusBody
		const onStatusRequest = await onStatusRequestDTO(
			context,
			statusBody.providers[0],
			callbackData.orderId,
			callbackData.status
		)
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_STATUS_ROUTE,
			body: onStatusRequest,
		})
	} catch (err) {
		console.log('OnStatus.ProtocolCallbacks.services: ', err)
	}
}
