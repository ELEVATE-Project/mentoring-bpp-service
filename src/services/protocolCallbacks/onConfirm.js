'use strict'
const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { onConfirmRequestDTO } = require('@dtos/onConfirmRequest')
const { externalRequests } = require('@helpers/requests')

exports.onConfirm = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_CONFIRM_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		console.log('ON_CONRIFM context:', context)
		console.log('ON_CONFIRM callbackData', callbackData)
		const response = await internalRequests.catalogGET({
			pathParams: { fulfillmentId: callbackData.fulfillmentId },
			route: process.env.CATALOG_GET_FULFILLMENT_ROUTE,
		})
		console.log('ON_CONRIFM Catalog Response:', response)
		const fulfillment = response.fulfillment
		console.log('ON_CONRIFM fulfillment:', fulfillment)
		fulfillment.tags = [
			{
				display: true,
				descriptor: {
					code: 'joinLink',
					name: 'joinLink',
				},
				list: [
					{
						descriptor: {
							code: callbackData.joinLink,
							name: callbackData.joinLink,
						},
					},
				],
			},
		]
		const onConfirmRequest = await onConfirmRequestDTO(
			context,
			fulfillment,
			callbackData.orderId,
			callbackData.joinLink
		)
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_CONFIRM_ROUTE,
			body: onConfirmRequest,
		})
	} catch (err) {
		console.log('OnConfirm.ProtocolCallbacks.services: ', err)
	}
}
