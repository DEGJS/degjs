"use strict";

let indexPageBuilder = function() {

	let categoryLinksRenderer = require('./renderers/categoryLinksRenderer')(),
		modulesRenderer = require('./renderers/modulesRenderer')(),
		categorizedModuleBuilder = require('./categorizedModuleBuilder')(),
		templateCompiler = require('./templateCompiler')(),
		categoriesData = require('../data/categories');


	function build() {
		console.log('Building index page...');

		let categorizedModulesData = categorizedModuleBuilder.build();
		
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







