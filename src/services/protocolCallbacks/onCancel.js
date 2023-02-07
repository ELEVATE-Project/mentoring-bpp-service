'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onCancelRequestDTO } = require('@dtos/onCancelRequest')
const { postRequest } = require('@utils/requester')
const { removeEmptyFields } = require('@utils/removeEmptyFields')

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
		const sanitizedOnSelectRequest = removeEmptyFields(onSelectRequest)
		await postRequest(callbackData.bapUri, process.env.ON_CANCEL_ROUTE, {}, sanitizedOnSelectRequest, {
			shouldSign: true,
		})
	} catch (err) {
		console.log('OnSelect.ProtocolCallbacks.services: ', err)
	}
}
