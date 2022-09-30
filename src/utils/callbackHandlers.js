'use strict'

const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const requester = require('@utils/requester')

exports.search = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_search',
		{},
		requestBodyGenerator('bap_on_search', payload.context.transaction_id, payload.context.message_id)
	)
	console.log(response.data)
}

exports.init = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_init',
		{},
		requestBodyGenerator('bap_on_init', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
		})
	)
	console.log(response.data)
}

exports.confirm = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_confirm',
		{},
		requestBodyGenerator('bap_on_confirm', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
			selectedFulfillmentId: payload.message.order.fulfillments[0].id,
		})
	)
	console.log(response.data)
}
