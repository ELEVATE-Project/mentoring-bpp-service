'use strict'
const { internalRequests } = require('@helpers/requests')
const { contextBuilder } = require('@utils/contextBuilder')
const { onConfirmRequestDTO } = require('@dtos/onConfirmRequest')
const { postRequest } = require('@utils/requester')

exports.onConfirm = async (confirmData) => {
	try {
		const context = await contextBuilder(
			confirmData.transactionId,
			confirmData.messageId,
			process.env.ON_CONFIRM_ACTION
		)
		//console.log(context)
		const response = await internalRequests.catalogGET({
			pathParams: { fulfillmentId: confirmData.fulfillmentId },
			route: process.env.CATALOG_GET_FULFILLMENT_ROUTE,
		})
		const fulfillment = response.fulfillment
		fulfillment.tags = [
			{
				display: true,
				code: 'joinLink',
				name: 'joinLink',
				list: [{ code: confirmData.joinLink, name: confirmData.joinLink }],
			},
		]
		const onConfirmRequest = await onConfirmRequestDTO(
			context,
			fulfillment,
			confirmData.orderId,
			confirmData.joinLink
		)
		await postRequest(confirmData.bapUri, process.env.ON_CONFIRM_ROUTE, {}, onConfirmRequest, { shouldSign: false })
	} catch (err) {
		console.log('OnConfirm.ProtocolCallbacks.services: ', err)
	}
}
