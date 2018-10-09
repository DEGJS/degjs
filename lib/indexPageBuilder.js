"use strict";

const indexPageBuilder = function() {

	const categoryLinksRenderer = require('./renderers/categoryLinksRenderer')();
	const modulesRenderer = require('./renderers/modulesRenderer')();
	const categorizedModuleBuilder = require('./categorizedModuleBuilder')();
	const templateCompiler = require('./templateCompiler')();
	const categoriesData = require('../data/categories');


	function build() {
		console.log('Building index page...');

		const categorizedModulesData = categorizedModuleBuilder.build();

		templateCompiler.compile({
			templateFilePath: 'src/index.html',
			replacements: [
				{
					placeholder: '{{categoryLinks}}',
					replacement: categoryLinksRenderer.render(categoriesData)
				},
				{
					placeholder: '{{modules}}',
					replacement: modulesRenderer.render(categorizedModulesData)
				}
			], 
			destFilePath: 'index.html'
		});
	}

	return {
		build: build
	}
}

indexPageBuilder().build();







