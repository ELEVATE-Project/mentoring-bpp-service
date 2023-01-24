'use strict'

exports.onConfirmRequestDTO = async (context, fulfillment, orderId) => {
	return {
		context,
		message: {
			order: {
				id: orderId,
				fulfillments: [fulfillment],
			},
		},
	}
}
