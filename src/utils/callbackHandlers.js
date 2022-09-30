'use strict'

const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const requester = require('@utils/requester')

exports.search = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_search',
		{},
		await requestBodyGenerator('bap_on_search', payload.context.transaction_id, payload.context.message_id)
	)
}

exports.init = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_init',
		{},
		await requestBodyGenerator('bap_on_init', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
		})
	)
}

exports.confirm = async (payload) => {
	const response = await requester.postRequest(
		payload.context.bap_uri + '/on_confirm',
		{},
		await requestBodyGenerator('bap_on_confirm', payload.context.transaction_id, payload.context.message_id, {
			orderId: payload.message.order.id,
			selectedFulfillmentId: payload.message.order.fulfillments[0].id,
		})
	)
}
