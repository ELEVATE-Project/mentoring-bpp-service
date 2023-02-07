'use strict'
const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { onConfirmRequestDTO } = require('@dtos/onConfirmRequest')
const { postRequest } = require('@utils/requester')
const { removeEmptyFields } = require('@utils/removeEmptyFields')

exports.onConfirm = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_CONFIRM_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		//console.log(context)
		const response = await internalRequests.catalogGET({
			pathParams: { fulfillmentId: callbackData.fulfillmentId },
			route: process.env.CATALOG_GET_FULFILLMENT_ROUTE,
		})
		const fulfillment = response.fulfillment
		fulfillment.tags = [
			{
				display: true,
				code: 'joinLink',
				name: 'joinLink',
				list: [{ code: callbackData.joinLink, name: callbackData.joinLink }],
			},
		]
		const onConfirmRequest = await onConfirmRequestDTO(
			context,
			fulfillment,
			callbackData.orderId,
			callbackData.joinLink
		)
		const sanitizedOnConfirmRequest = removeEmptyFields(onConfirmRequest)
		await postRequest(callbackData.bapUri, process.env.ON_CONFIRM_ROUTE, {}, sanitizedOnConfirmRequest, {
			shouldSign: true,
		})
	} catch (err) {
		console.log('OnConfirm.ProtocolCallbacks.services: ', err)
	}
}
