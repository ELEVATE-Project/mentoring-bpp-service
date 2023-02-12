'use strict'

exports.onCancelRequestDTO = async (context, orderId) => {
	return {
		context,
		message: {
			order: {
				id: orderId,
			},
		},
	}
}
