'use strict'

const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const requester = require('@utils/requester')
const { onSearchRequest } = require('@dtos/onSearchRequest')
const crypto = require('crypto')

exports.search = async (requestBody, catalogResponse) => {
	try {
		const onSearchRequestBody = catalogResponse.catalog
			? onSearchRequest(requestBody.context.transaction_id, requestBody.context.message_id, catalogResponse)
			: catalogResponse
		const response = await requester.postRequest(
			requestBody.context.bap_uri,
			'/on_search',
			{},
			onSearchRequestBody,
			{
				shouldSign: true,
			}
		)
		console.log(response)
	} catch (err) {
		console.log(err)
	}
}

exports.init = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri,
		'/on_init',
		{},
		await requestBodyGenerator('bap_on_init', payload.context.transaction_id, payload.context.message_id, {
			orderId: await crypto.randomUUID(),
		}),
		{ shouldSign: true }
	)
}

exports.confirm = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri,
		'/on_confirm',
		{},
		await requestBodyGenerator('bap_on_confirm', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
			selectedFulfillmentId: payload.message.order.fulfillments[0].id,
			itemId: payload.message.order.items[0].id,
		}),
		{ shouldSign: true }
	)
}

exports.cancel = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri,
		'/on_cancel',
		{},
		await requestBodyGenerator('bap_on_cancel', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
		}),
		{ shouldSign: true }
	)
}

exports.status = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri,
		'/on_status',
		{},
		await requestBodyGenerator('bap_on_status', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
		}),
		{ shouldSign: true }
	)
}
