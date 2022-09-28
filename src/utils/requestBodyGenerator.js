'use strict'
const { faker } = require('@faker-js/faker')

const requestBody = {
	context: {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action: 'temp',
		bpp_id: process.env.BPP_ID,
		bpp_uri: process.env.BPP_URI,
		timestamp: new Date().toISOString(),
	},
	message: {
		catalog: {
			'bpp/descriptor': {
				name: 'Elevate BPP #1',
				code: 'elevate-bpp-1',
				symbol: '<i class="fas fa-vihara"></i>',
				short_desc: faker.lorem.sentence(5),
				long_desc: faker.lorem.sentences(2),
				images: ['https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png'],
				audio: 'string',
				video: 'string',
				'3d_render': 'string',
			},
			'bpp/categories': [
				{
					id: '123',
					description: 'BPP focused on educational leadership.',
					descriptor: {
						name: 'Education Leadership',
						code: 'EL',
					},
				},
			],
			'bpp/providers': [
				{
					descriptor: {
						name: 'CBSE',
					},
					categories: [],
					items: [
						{
							id: '1',
							category_id: '123',
							descriptor: {
								name:
									'10th Std ' +
									faker.helpers.arrayElement([
										'Mathematics',
										'Physics',
										'Chemistry',
										'English',
										'Biology',
										'Computer Science',
										'Social Science',
									]),
								code: 'X-MATH-CBSE',
								short_desc: faker.lorem.sentence(5),
								long_desc: faker.lorem.sentences(2),
								images: [
									'https://picsum.photos/300/200',
									'https://picsum.photos/300/200',
									'https://picsum.photos/300/200',
								],
							},
							fulfillment_id: '1',
							price: {
								value: '0',
							},
							tags: {
								recommended_for: ['HM', 'Principals', 'Teachers'],
							},
							matched: true,
						},
					],
				},
			],
			fulfillments: [
				{
					id: '1',
					type: 'ONLINE',
					language: [
						// It's a new field, that conveys how the session will be delivered, can be used for any service.
						'hi',
						'en',
					],
					descriptor: {
						name: 'Full-time',
					},
					tags: {
						status: 'Live/Published',
						timeZone: '',
					},
					agent: {
						name:
							faker.name.prefix('male') +
							' ' +
							faker.name.fullName({
								sex: 'male',
							}),
						image: faker.image.avatar(),
						gender: 'M',
						tags: {
							subjects: ['maths', 'physics'],
							grades: 'X, XI, XII',
							boards: 'CBSE, ICSE',
							rating: '5',
						},
					},
					start: {
						// Will be in UTC
						time: {
							timestamp: '2021-03-23T10:00:40.065Z',
						},
					},
					end: {
						// Will be in UTC
						time: {
							timestamp: '2021-03-23T10:00:40.065Z',
						},
					},
				},
			],
		},
	},
}

exports.requestBodyGenerator = (api, transaction_id) => {
	if (api === 'BAP_OnSearch') {
		requestBody.context.transaction_id = transaction_id
		return requestBody
	}
}
