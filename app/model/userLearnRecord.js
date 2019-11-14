"use strict";

module.exports = app => {
	const {
		BIGINT,
		JSON,
	} = app.Sequelize;

	const model = app.model.define("userLearnRecords", {
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

		extra: {
			type: JSON,
			defaultValue: {},
		},
	}, {
		underscored: false,
		charset: "utf8mb4",
		collate: "utf8mb4_bin",

		indexes: [
			{
				unique: true,
				fields: ["userId", "packageId", "lessonId"],
			},
		],
	});

	// model.sync({force:true});

	model.getSkills = async userId => {
		const sql = `select skillName, enSkillName, sum(score) as score from (
			select s.skillName, s.enSkillName, ls.score
			 FROM userLearnRecords as ulr, lessonSkills as ls,skills as s 
			 where ulr.userId = :userId 
			 and ulr.lessonId = ls.lessonId 
			 and ls.skillId = s.id
			) as t group by skillName`;
		const list = await app.model.query(sql, {
			type: app.model.QueryTypes.SELECT,
			replacements: {
				userId,
			}
		});

		return list;
	};

	return model;
};