"use strict";

let modulesRenderer = function() {

	function render(categoriesData) {
		return categoriesData.reduce(renderCategory, '');
	}

	function renderCategory(htmlString, categoryData) {
		let modulesHtml = renderModules(categoryData.modules);
		return `${htmlString}
				<div class="category" id="${categoryData.id}">
					<h2 class="category__title">${categoryData.name}</h2>
					${modulesHtml}
				</div>`;
	}

	function renderModules(modulesData) {
		let modulesHtml = modulesData.reduce(renderModule, '');
		return `<ul class="module-list">${modulesHtml}</ul>`;
	}

	function renderModule(htmlString, moduleData) {
		return `${htmlString}
				<li class="module" id="${moduleData.name}">
					<header class="module__header">
						<h3 class="module__title">${moduleData.name}</h3>
						${renderVersion(moduleData)}
					</header>
					<p class="module__description">${moduleData.description}</p>
					<ul class="module__links">
						<li class="module__link-item">
							<a class="module__link" target="_blank" href="${moduleData.html_url}">Source</a>
						</li>
						${renderHomepage(moduleData)}
					</ul>
				</li>`;
	}

	function renderVersion(moduleData) {
		if(moduleData.version) {
			return `<span class="module__version">v${moduleData.version}</span>`
		}

		return '';
	}

	function renderHomepage(moduleData) {
		if(moduleData.homepage) {
			return `<li class="module__link-item">
						<a class="module__link" target="_blank" href="${moduleData.homepage}">Demo</a>
					</li>`;
		}

		return '';
	}

	return {
		render: render
	}

}

module.exports = modulesRenderer;