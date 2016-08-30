"use strict";

let categorizedModuleBuilder = function() {

	let modulesData = require('../data/modules'),
		categoriesData = require('../data/categories'),
		reposData = require('../data/repos');

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
			return moduleData.categoryId == categoryId
		}).map(function(moduleData) {
			return buildModule(moduleData);
		}).sort(function(moduleData1, moduleData2) {
			return moduleData1.name > moduleData2.name;
		});
	}

	function buildModule(moduleData) {
		return reposData.find(function(repoData) {
			return repoData.name === moduleData.name;
		});
	}

	return {
		build: build
	};
}

module.exports = categorizedModuleBuilder;