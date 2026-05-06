'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('bap', {
			bap_id: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,
			},
			bap_uri: {
				type: Sequelize.STRING,
				allowNull: false,
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
		await queryInterface.dropTable('bap')
	},
}
