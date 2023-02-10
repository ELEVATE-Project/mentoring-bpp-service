'use strict'
/*
NOTE: TEMPORARY SCRIPT FILE FOR POPULATING SESSIONS IN MENTORING SERVICE.
WILL BE REMOVED IN FUTURE AS THIS SCRIPT SHOULD IDEALLY BE PLACED IN MENTORING SERVICE.
ONLY FOR TESTING PURPOSES.
*/

const axios = require('axios')
const { faker } = require('@faker-js/faker')
const moment = require('moment')

const payloadGenerator = () => {
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

	let startDate = moment()
		.add(Math.floor(Math.random() * 8) + 1, 'days')
		.add(Math.floor(Math.random() * 300) + 40, 'minutes')
	const endDate = moment(startDate)
		.add(Math.floor(Math.random() * 2) + 1, 'hours')
		.unix()
	startDate = startDate.unix()
	console.log('START DATE: ', startDate)
	console.log('END DATE: ', endDate)

	let categoryNames = []
	for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
		categoryNames.push(
			faker.helpers.arrayElement(['Academic', 'Educational', 'Co-curricular', 'Administrative', 'Financial']) +
				' ' +
				faker.helpers.arrayElement(['Leadership', 'Improvement', 'Activities', 'Management'])
		)
	}

	let recommendedFor = faker.helpers.arrayElements(['Headmasters', 'Principals', 'Teachers', 'Office Staffs', 'PTA'])

	return JSON.stringify({
		title: 'Grade ' + grade + ' ' + subject,
		description: faker.lorem.sentence(5),
		startDate: startDate,
		endDate: endDate,
		recommendedFor: recommendedFor.map((user) => {
			return { value: user.toUpperCase().split(' ').join('-'), label: user }
		}),
		categories: categoryNames.map((category) => {
			return {
				value: category.toUpperCase().split(' ').join('-'),
				label: category,
			}
		}),
		medium: [
			{
				label: 'English',
				value: '1',
			},
		],
		timeZone: 'Asia/Calcutta',
		image: [faker.image.abstract() + '?random=' + faker.random.alphaNumeric(10)],
	})
}

const config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'https://dev.elevate-apis.shikshalokam.org/dsep-mentoring/v1/sessions/update',
	headers: {
		'X-auth-token':
			'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYzZTU1NDdiNjI4MjBmZDllNmJlOWUwMiIsImVtYWlsIjoiam9mZmlubWVudG9ydGVuQHR1bmVybGFicy5jb20iLCJuYW1lIjoiam9mZmluIE1lbnRvciBUZW4iLCJpc0FNZW50b3IiOnRydWV9LCJpYXQiOjE2NzU5NzM3NTUsImV4cCI6MTY3NjA2MDE1NX0.P2Urmidr53FCpiIu27FSnJEWi3nmA2zUQ2N9zWbNx8M',
		'Content-Type': 'application/json',
	},
	data: payloadGenerator(),
}

const run = () => {
	setInterval(() => {
		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data))
			})
			.catch(function (error) {
				console.log(error)
			})
	}, 1000)
}

/* axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data))
	})
	.catch(function (error) {
		console.log(error)
	})
 */
run()
