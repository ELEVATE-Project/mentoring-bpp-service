'use strict'

exports.onSelectRequestDTO = async (context, provider) => {
	return {
		context,
		message: {
			order: {
				provider,
			},
		},
	}
}
