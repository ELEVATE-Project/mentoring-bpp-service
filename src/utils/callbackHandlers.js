'use strict'

const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const requester = require('@utils/requester')

exports.search = async (payload) => {
	console.log(payload)
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_search',
		{},
		await requestBodyGenerator('bap_on_search', payload.context.transaction_id, payload.context.message_id)
	)
	console.log(response.data)
}

exports.init = async (payload) => {
	console.log(payload)
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_init',
		{},
		await requestBodyGenerator('bap_on_init', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
		})
	)
	console.log(response.data)
}

exports.confirm = async (payload) => {
	console.log(payload.message)
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_confirm',
		{},
		await requestBodyGenerator('bap_on_confirm', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
			selectedFulfillmentId: payload.message.order.fulfillments[0].id,
		})
	)
	console.log(response.data)
}
