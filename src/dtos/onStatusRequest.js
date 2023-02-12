'use strict'

exports.onStatusRequestDTO = async (context, statusBody, orderId, status) => {
	return {
		context,
		message: {
			order: {
				id: orderId,
				state: status,
				type: 'DEFAULT',
				provider: statusBody,
			},
		},
	}
}
