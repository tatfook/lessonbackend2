"use strict";

const Service = require("../common/service.js");

class PackageService extends Service {
	/**
	 * 通过条件获取package
	 * @param {*} condition  必选,对象
	 */
	async getByCondition(condition) {
		let data = await this.ctx.model.Package.findOne({ where: condition });
		if (data) data = data.get({ plain: true });

		return data;
	}

	/**
	 * 根据条件获取全部记录
	 * @param {*} condition 
	 */
	async getAllByCondition(condition) {
		let list = await this.ctx.model.Package.findAll({ where: condition });
		return list ? list.map(r => r.get()) : [];
	}
}

module.exports = PackageService;