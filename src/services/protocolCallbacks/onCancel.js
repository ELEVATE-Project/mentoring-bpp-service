'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onCancelRequestDTO } = require('@dtos/onCancelRequest')
const { externalRequests } = require('@helpers/requests')

exports.onCancel = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_CANCEL_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		const onSelectRequest = await onCancelRequestDTO(context, callbackData.orderId)
		await externalRequests.callbackPOST({
			baseURL: callbackData.bapUri,
			route: process.env.ON_CANCEL_ROUTE,
			body: onSelectRequest,
		})
	} catch (err) {
		console.log('OnSelect.ProtocolCallbacks.services: ', err)
	}
}
