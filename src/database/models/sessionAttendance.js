
'use strict'
module.exports = (sequelize, DataTypes) => {
	const SessionAttendance = sequelize.define(
		'SessionAttendance',
		{
			session_id: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
			},
			session_attendee_id: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			fulfillment_id: {
				type: DataTypes.STRING,
			},
			order_id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			cancellation_reason_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			cancellation_reason_desc: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			tableName: 'session_attendance',
			timestamps: true,
			paranoid: true,
			underscored: true,
		}
	)
	return SessionAttendance
}
