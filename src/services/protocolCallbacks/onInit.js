'use strict'

const { contextBuilder } = require('@utils/contextBuilder')
const { onInitRequestDTO } = require('@dtos/onInitRequest')
const { postRequest } = require('@utils/requester')
const crypto = require('crypto')

exports.onInit = async (callbackData) => {
	try {
		const context = await contextBuilder(
			callbackData.transactionId,
			callbackData.messageId,
			process.env.ON_INIT_ACTION,
			callbackData.bapId,
			callbackData.bapUri
		)
		const orderId = crypto.randomUUID()
		const onInitRequest = await onInitRequestDTO(context, orderId)
		await postRequest(callbackData.bapUri, process.env.ON_INIT_ROUTE, {}, onInitRequest, {
			shouldSign: process.env.SHOULD_SIGN_OUTBOUND_REQUEST === 'false' ? false : true,
		})
	} catch (err) {
		console.log('OnSearch.ProtocolCallbacks.services: ', err)
	}
}
