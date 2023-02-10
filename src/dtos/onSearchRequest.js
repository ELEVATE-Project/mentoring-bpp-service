'use strict'

exports.onSearchRequestDTO = async (context, catalog) => {
	return {
		context,
		message: {
			catalog,
		},
	}
}
