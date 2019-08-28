"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		const {
			BIGINT,
			INTEGER,
			JSON,
		} = Sequelize;

		return queryInterface.createTable("lessonRewards", {
			id: {
				type: BIGINT,
				autoIncrement: true,
				primaryKey: true,
			},

			userId: {
				type: BIGINT,
				allowNull: false,
			},

			packageId: {
				type: BIGINT,
				allowNull: false,
			},

			lessonId: {
				type: BIGINT,
				allowNull: false,
			},

			amount: { // 返还金额
				type: INTEGER,
				defaultValue: 0,
			},

			extra: {
				type: JSON,
				defaultValue: {},
			},

			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},

			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},

		}, {
			underscored: false,
			charset: "utf8mb4",
			collate: "utf8mb4_bin",
		});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("lessonRewards");
	}
};
