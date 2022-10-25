'use strict'
const { faker } = require('@faker-js/faker')
const moment = require('moment')
const { cacheSave, cacheGet } = require('@utils/redis')

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
	message: {},
}

const getSearchMessage = () => {
	return {
		catalog: {
			'bpp/descriptor': {
				name: process.env.BPP_NAME,
				code: process.env.BPP_CODE,
				symbol: process.env.BPP_SYMBOL,
				short_desc: faker.lorem.sentence(5),
				long_desc: faker.lorem.sentences(2),
				images: ['https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png'],
				audio: 'string',
				video: 'string',
				'3d_render': 'string',
			},
			'bpp/categories': ['1', '2', '3', '4'].map((categoryId) => {
				return {
					id: categoryId,
					description: faker.lorem.sentence(5),
					descriptor: {
						name:
							faker.helpers.arrayElement([
								'Academic',
								'Educational',
								'Co-curricular',
								'Administrative',
								'Financial',
							]) +
							' ' +
							faker.helpers.arrayElement(['Leadership', 'Improvement', 'Activities', 'Management']),
						code: faker.lorem.word(2).toUpperCase(),
					},
				}
			}),
			'bpp/providers': ['1', '2', '3', '4'].map((id) => {
				const provider = faker.helpers.arrayElement(['CBSE', 'ICSE', 'NCTE', 'NIT-C', 'IIT-B'])
				const subject = faker.helpers.arrayElement([
					'Mathematics',
					'Physics',
					'Chemistry',
					'English',
					'Biology',
					'Computer Science',
					'Social Science',
				])
				const grade = faker.helpers.arrayElement(['IX', 'X', 'XI', 'XII'])
				return {
					descriptor: {
						name: provider,
					},
					categories: [],
					items: [
						{
							id: id,
							category_id: id,
							descriptor: {
								name: 'Grade ' + grade + ' ' + subject,
								code: [grade, subject.replace(/\s+/g, '-').toUpperCase(), provider].join('-'),
								short_desc: faker.lorem.sentence(5),
								long_desc: faker.lorem.sentences(2),
								images: [
									faker.image.abstract() + '?random=' + faker.random.alphaNumeric(10),
									faker.image.abstract() + '?random=' + faker.random.alphaNumeric(10),
									faker.image.abstract() + '?random=' + faker.random.alphaNumeric(10),
								],
							},
							fulfillment_id: id,
							price: {
								value: '0',
							},
							tags: {
								recommended_for: faker.helpers.arrayElements([
									'Headmasters',
									'Principals',
									'Teachers',
									'Office Staffs',
									'PTA',
								]),
							},
							matched: true,
						},
					],
				}
			}),
			fulfillments: ['1', '2', '3', '4'].map((id) => {
				const sex = faker.helpers.arrayElement(['male', 'female'])
				const startDate = moment()
					.add(Math.floor(Math.random() * 8) + 1, 'days')
					.add(Math.floor(Math.random() * 300) + 40, 'minutes')
				const endDate = moment(startDate).add(Math.floor(Math.random() * 2) + 1, 'hours')
				return {
					id: id,
					type: faker.helpers.arrayElement(['ONLINE', 'OFFLINE']),
					language: ['hi', 'en'],
					descriptor: {
						name: 'Full-time',
					},
					tags: {
						status: 'Live/Published',
						timeZone: '',
					},
					agent: {
						name:
							faker.name.prefix(sex) +
							' ' +
							faker.name.fullName({
								sex: sex,
							}),
						image: faker.image.avatar(),
						gender: sex[0].toUpperCase(),
						tags: {
							subjects: faker.helpers.arrayElements(
								[
									'Mathematics',
									'Physics',
									'Chemistry',
									'English',
									'Biology',
									'Computer Science',
									'Social Science',
								],
								Math.floor(Math.random() * 2) + 1
							),
							grades: faker.helpers.arrayElements(['IX', 'X', 'XI', 'XII']),
							boards: faker.helpers.arrayElements(['CBSE', 'KSEEB', 'ICSE', 'SCERT']),
							rating: Math.floor(Math.random() * 5) + 1,
						},
					},
					start: {
						time: {
							timestamp: startDate.utc().format(),
						},
					},
					end: {
						time: {
							timestamp: endDate.utc().format(),
						},
					},
				}
			}),
		},
	}
}

exports.requestBodyGenerator = async (api, transactionId, messageId, body = {}) => {
	requestBody.context.transaction_id = transactionId
	requestBody.context.message_id = messageId
	if (api === 'bap_on_search') {
		requestBody.context.action = 'on_search'
		requestBody.message = getSearchMessage()
		await cacheSave(`${transactionId}:SEARCH`, requestBody.message.catalog)
	} else if (api === 'bap_on_init') {
		requestBody.context.action = 'on_init'
		requestBody.message = {
			order: {
				id: body.orderId,
			},
		}
	} else if (api === 'bap_on_confirm') {
		const catalog = await cacheGet(`${transactionId}:SEARCH`)
		const selectedFulfillment = catalog.fulfillments.filter((fulfillment) => {
			return fulfillment.id === body.selectedFulfillmentId
		})
		const selectedItem = (() => {
			const providers = catalog['bpp/providers']
			for (let i = 0; i < providers.length; i++) {
				const items = providers[i].items
				for (let j = 0; j < items.length; j++) {
					if (items[j].id === body.itemId) return items[j]
				}
			}
		})()
		requestBody.context.action = 'on_confirm'
		requestBody.message = {
			order: {
				id: body.orderId,
				fulfillments: selectedFulfillment,
			},
		}
		requestBody.message.order.fulfillments[0].tags = {
			link: faker.internet.url() + '/session?id=' + faker.random.alphaNumeric(10),
		}
		await cacheSave(`${body.orderId}`, {
			items: selectedItem,
			fulfillments: selectedFulfillment,
		})
	} else if (api === 'bap_on_cancel') {
		requestBody.context.action = 'on_cancel'
		requestBody.message = {
			order: {
				id: body.orderId,
			},
		}
	} else if (api === 'bap_on_status') {
		requestBody.context.action = 'on_status'
		const orderDetails = await cacheGet(`${body.orderId}`)
		requestBody.message = {
			order: {
				id: body.orderId,
				...orderDetails,
			},
		}
	}
	return requestBody
}
