'use strict'

const { requestBodyGenerator } = require('@utils/requestBodyGenerator')
const requester = require('@utils/requester')

exports.search = async (req) => {
	const response = await requester.postRequest(
		req.body.context.bap_uri + '/on_search',
		{},
		requestBodyGenerator('BAP_OnSearch')
	)
	console.log(response.data)
}
