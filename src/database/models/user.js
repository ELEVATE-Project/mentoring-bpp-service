'use strict'

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			bap_id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: 'user',
			timestamps: true,
			paranoid: true,
			underscored: true,
		}
	)
	return User
}
