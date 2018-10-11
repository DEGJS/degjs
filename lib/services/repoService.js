"use strict";

const repoService = function() {
	const userAgent = 'degjs-website';
	const graphQLEndpoint = 'https://api.github.com/graphql'

	const request = require('request');

	function getGraphQLQuery() {
		return `
			query {
				organization(login: "DEGJS") {
					id
					name
					repos: repositories(privacy: PUBLIC, first: 50, orderBy: {direction:ASC,field:NAME})  {
					  totalCount,
					  repoList: nodes {
						id
						description
						homepageUrl
						name
						updatedAt
						url
						refs(first:1, refPrefix:"refs/tags/", orderBy:{field:ALPHABETICAL , direction:DESC }) {
						  refList: nodes{
							name,
						  }
						},
						topics:repositoryTopics(first:1){
						  topicList:nodes {
							topic {
							  name
							}
						  }
						}
					  }
					}
				}
			}
		`;
	}	

	function getRepos() {
		const options = createRequestOptions();

		return performRequest(options);
	}

	function createRequestOptions() {
		return {
			url: graphQLEndpoint,
			method: 'POST',
			headers: {
				'User-Agent': userAgent,
				Authorization: `token ${process.env.ACCESS_TOKEN}`,
			},
			json: {
				query: getGraphQLQuery()
			}
		};
	}

	function performRequest(options) {
		return new Promise(function (resolve, reject) {
			request(options, function(error, response, body) {
				if (!error) {
					switch(response.statusCode) {
						case 200:
							resolve({
								data: body
							});
							break;
						case 304:
							resolve({
								data: null
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
		getRepos: getRepos
	}
}

module.exports = repoService;