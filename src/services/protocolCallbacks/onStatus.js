'use strict'

const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { postRequest } = require('@utils/requester')
const { onStatusRequestDTO } = require('@dtos/onStatusRequest')

exports.onStatus = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_STATUS_ACTION
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
		await postRequest(callbackData.bapUri, process.env.ON_STATUS_ROUTE, {}, onStatusRequest, { shouldSign: true })
	} catch (err) {
		console.log('OnStatus.ProtocolCallbacks.services: ', err)
	}
}
