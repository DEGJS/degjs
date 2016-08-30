"use strict";

let reposFileWriter = function() {

	const filePath = 'data/repos.json';

	let fs = require('fs');

	function writeFile(data) {

		fs.writeFile(filePath, JSON.stringify(data, null, '\t'), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 

	}

	return {
		writeFile: writeFile
	};
}

module.exports = reposFileWriter;