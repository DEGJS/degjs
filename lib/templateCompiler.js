"use strict";

const templateCompiler = function() {

	const fs = require('fs');

	function compile(options) {

		fs.readFile(options.templateFilePath, function(err, fileData) {
			if(err) throw err;
		  
			const populatedFileData = options.replacements.reduce(processReplacement, fileData);

		 	fs.writeFileSync(options.destFilePath, populatedFileData);
		  
		});
	}

	function processReplacement(fileData, replacementObj) {
		return fileData.toString().replace(replacementObj.placeholder, replacementObj.replacement);
	}

	return {
		compile: compile
	};
}

module.exports = templateCompiler;