'use strict'

module.exports = (sequelize, DataTypes) => {
	const Bap = sequelize.define(
		'Bap',
		{
			bap_id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			bap_uri: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'bap',
			timestamps: true,
			paranoid: true,
			underscored: true,
		}
	)
	return Bap
}
