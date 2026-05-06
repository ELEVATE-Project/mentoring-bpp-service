'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('session_attendance', {
			
			session_id: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
			},
			session_attendee_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			fulfillment_id: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			order_id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal('gen_random_uuid()'),
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			cancellation_reason_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			cancellation_reason_desc: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		})
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable('session_attendance')
	},
}
