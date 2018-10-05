"use strict";

const reposUpdater = function() {

	const repoService = require('./services/repoService')();
	const reposFileWriter = require('./reposFileWriter')();

	function update() {
		console.log('Updating repos...');
		
		getRepos()
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

		return repoService.getRepos()
				.then(onReposRetrieved);
	}

	function onReposRetrieved(result) {
		console.log('All repositories retrieved');

		const repoData = buildRepoData(result.data.data);
		writeReposFile(repoData);
	}

	function buildRepoData(data) {
		return data.organization.repos.repoList.map(repo => {
			return {
				name: repo.name,
				description: repo.description,
				html_url: repo.url,
				homepage: repo.homepageUrl,
				lastModified: repo.updatedAt,
				version: repo.refs.refList[0] && repo.refs.refList[0].name || '',
				category: repo.topics.topicList[0] && repo.topics.topicList[0].topic && repo.topics.topicList[0].topic.name || 'misc'
			}
			
		})
	}

	return {
		update: update
	}
}

reposUpdater().update();