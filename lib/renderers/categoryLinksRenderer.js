"use strict";

let categoryLinksRenderer = function() {

	function render(categoriesData) {
		let categoryLinksHtml = categoriesData.reduce(renderCategoryLink, '');
		return `<ul>
					${categoryLinksHtml}
				</ul>`;
	}

	function renderCategoryLink(htmlString, categoryData) {
		return `${htmlString}
				<li>
					<a href="#${categoryData.id}">${categoryData.name}</a>
				</li>`;
	}

	return {
		render: render
	}

}

module.exports = categoryLinksRenderer;