"use strict";

let reposUpdater = function() {

	let repoService = require('./services/repoService')(),
		reposFileWriter = require('./reposFileWriter')(),
		reposData = require('../data/repos'),
		modulesData = require('../data/modules');

	function update() {
		console.log('Updating repos...');
		
		getRepos()
			.then(writeReposFile)
			.catch(function(error) {
				console.log("Error retrieving repos: " + error);
			});
		
	}

	function writeReposFile(newReposData) {
		console.log('Writing to repo cache file...');
		reposFileWriter.writeFile(newReposData);
		return newReposData;
	}

	function getRepos() {
		console.log('Requesting all repositories...');

		return repoService.getRepos(reposData)
				.then(onReposRetrieved);
	}

	function onReposRetrieved(result) {
		console.log('All repositories retrieved');

		let repoPromises = result.data
							.filter(matchRepoToModule)
							.map(buildRepoData)
							.map(getRepoTags);

		return Promise.all(repoPromises);
	}

	function buildRepoData(data) {
		let newRepoData = {
			name: data.name,
			description: data.description, 
			html_url: data.html_url,
			homepage: data.homepage
		};

		let oldRepoData = reposData.find(function(repoData) {
			return repoData.name === newRepoData.name;
		});

		if(oldRepoData) {
			return Object.assign({}, oldRepoData, newRepoData);
		} else {
			return newRepoData;
		}
	}

	function getRepoTags(newRepoData) {
		console.log('Requesting tags for ' + newRepoData.name + ' repository...');

		return repoService.getRepoTags(newRepoData.name, newRepoData.lastModified)
			.then(function(result) {
				return onRepoTagsRetrieved(newRepoData, result.data, result.lastModified);
			});
	}

	function onRepoTagsRetrieved(newRepoData, newTagsData, lastModified) {
		newRepoData.lastModified = lastModified;

		console.log(newRepoData.name + ' tags retrieved');

		if(newTagsData != null) {
			console.log('New ' + newRepoData.name + ' tags found, updating');
			if(newTagsData.length) {
				newRepoData.version = newTagsData[0].name;
			} else {
				newRepoData.version = null;
			}
		}

		return newRepoData;
	}

	function onReposError(error) {
		console.log("Error retrieving repositories: ");
		console.log(error);
	}

	function matchRepoToModule(repoData) {
		return modulesData.find(function(moduleData) {
				return moduleData.name === repoData.name;
			}) != null;
	}

	return {
		update: update
	}
}

reposUpdater().update();