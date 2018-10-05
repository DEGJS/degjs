"use strict";

const categoryLinksRenderer = function() {

	function render(categoriesData) {
		const categoryLinksHtml = categoriesData.reduce(renderCategoryLink, '');
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