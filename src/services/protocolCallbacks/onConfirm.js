'use strict'
const { contextBuilder } = require('@utils/contextBuilder')

exports.onConfirm = async ({ confirmData }) => {
	try {
		const context = await contextBuilder(
			confirmData.transactionId,
			confirmData.messageId,
			process.env.ON_CONFIRM_ACTION
		)
		console.log(context)
		const message = {
			order: {
				id: confirmData.orderId,
			},
		}
	} catch (err) {
		console.log('OnConfirm.ProtocolCallbacks.services: ', err)
	}
}
