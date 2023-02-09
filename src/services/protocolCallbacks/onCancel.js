'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onCancelRequestDTO } = require('@dtos/onCancelRequest')
const { postRequest } = require('@utils/requester')

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
		await postRequest(callbackData.bapUri, process.env.ON_CANCEL_ROUTE, {}, onSelectRequest, {
			shouldSign: process.env.SHOULD_SIGN_OUTBOUND_REQUEST === 'false' ? false : true,
		})
	} catch (err) {
		console.log('OnSelect.ProtocolCallbacks.services: ', err)
	}
}
