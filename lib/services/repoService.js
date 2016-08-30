"use strict";

let repoService = function() {

	const apiConfig = {
			owner: 'DEGJS',
			baseUrl: 'https://api.github.com/',
			urls: {
				repos: 'users/{owner}/repos',
				tags: 'repos/{owner}/{repo}/tags'
			}
		}, 
		userAgent = 'degjs-website';

	let request = require('request');

	function getRepos(lastModifiedDates) {
		
		let options = createRequestOptions(apiConfig.urls.repos);

		return performRequest(options);
	}

	function getRepoTags(repoName, lastModified) {
		let url = apiConfig.urls.tags.replace('{repo}', repoName);

		let options = createRequestOptions(url, lastModified);
		
		return performRequest(options);
	}

	function createRequestOptions(apiUrl, lastModified) {
		let url = apiConfig.baseUrl + apiUrl.replace('{owner}', apiConfig.owner);

		let options = {
		  url: url,
		  headers: {
		    'User-Agent': userAgent
		  }
		};

		if(lastModified) {
			options.headers['If-Modified-Since'] = lastModified;
		}

		return options;
	}

	function performRequest(options) {
		return new Promise(function (resolve, reject) {
			request(options, function(error, response, body) {
				if (!error) {
					switch(response.statusCode) {
						case 200:
							resolve({
								data: JSON.parse(body), 
								lastModified: response.headers['Last-Modified']
							});
							break;
						case 304:
							resolve({
								data: null, 
								lastModified: response.headers['Last-Modified']
							});
							break;
						default: 
							reject('Unexpected response status code: ' + response.statusCode);
							break;
					}
				} else {
					reject(error);
				}
			});
		});
	}

	return {
		getRepos: getRepos,
		getRepoTags: getRepoTags
	}
}

module.exports = repoService;