'use strict'
const { faker } = require('@faker-js/faker')
const moment = require('moment')

const requestBody = {
	context: {
		domain: process.env.DOMAIN,
		country: process.env.COUNTRY,
		city: process.env.CITY,
		action: 'search',
		bpp_id: process.env.BPP_ID,
		bpp_uri: process.env.BPP_URI,
		timestamp: new Date().toISOString(),
	},
	message: {
		catalog: {
			'bpp/descriptor': {
				name: 'Elevate BPP #2',
				code: 'elevate-bpp-2',
				symbol: '<i class="fas fa-user-graduate"></i>',
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
									'https://picsum.photos/300/200',
									'https://picsum.photos/300/200',
									'https://picsum.photos/300/200',
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
				const startDate = moment().add('days', Math.floor(Math.random() * 8) + 1)
				const endDate = moment(startDate).add('hours', Math.floor(Math.random() * 2) + 1)
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
	},
}

exports.requestBodyGenerator = (api, transaction_id) => {
	if (api === 'BAP_OnSearch') {
		requestBody.context.transaction_id = transaction_id
		return requestBody
	}
}
