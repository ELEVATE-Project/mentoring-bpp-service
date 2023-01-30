'use strict'

exports.onSelectRequestDTO = async (context, session) => {
	return {
		context,
		message: {
			order: {
				provider: session,
			},
		},
	}
}
