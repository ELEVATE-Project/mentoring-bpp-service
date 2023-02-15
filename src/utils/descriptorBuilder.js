'use strict'

exports.descriptorBuilder = () => {
	return {
		name: process.env.BPP_NAME,
		code: process.env.BPP_CODE,
		short_desc: process.env.BPP_SHORT_DESCRIPTION,
		long_desc: process.env.BPP_LONG_DESCRIPTION,
		images: [
			{
				url: process.env.BPP_IMAGE,
				size_type: process.env.BPP_IMAGE_TYPE,
				width: process.env.BPP_IMAGE_WIDTH,
				height: process.env.BPP_IMAGE_HEIGHT,
			},
		],
	}
}
