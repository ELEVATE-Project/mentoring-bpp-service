'use strict'

exports.onInitRequestDTO = async (context, orderId) => {
	return {
		context,
		message: {
			order: {
				id: orderId,
			},
		},
	}
}
