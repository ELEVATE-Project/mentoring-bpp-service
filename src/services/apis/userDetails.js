'use strict'
const userQueries = require('@database/queries/user')

/**
 * Service to get user details by user IDs
 * @param {Object} requestBody - The request body containing user IDs
 * @returns {Promise<Array>} - Array of user details
 */
exports.getUserDetails = async (requestBody) => {
	try {
		const { userIds } = requestBody
		
		if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
			throw new Error('User IDs array is required and cannot be empty')
		}
		
		// Get user details from the database
		const users = await userQueries.findByIds(userIds)
		
		// Return user details without sensitive information
		return users.map(user => ({
			id: user.id,
			name: user.name,
			email: user.email
		}))
	} catch (err) {
		console.error('Error in getUserDetails service:', err)
		throw err
	}
}