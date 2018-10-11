"use strict";

const categorizedModuleBuilder = function() {

	const modulesData = require('../data/repos');
	const categoriesData = require('../data/categories');

	function build() {
		return categoriesData.map(buildCategory);
	}

	function buildCategory(categoryData) {
		return {
			id: categoryData.id,
			name: categoryData.name,
			modules: buildModules(categoryData.id)
		};
	}

	function buildModules(categoryId) {
		return modulesData.filter(function(moduleData) {
			return moduleData.categoryId === categoryId
		});
	}

	return {
		build: build
	};
}

module.exports = categorizedModuleBuilder;