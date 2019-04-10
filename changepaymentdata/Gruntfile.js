module.exports = function(grunt) {
	"use strict";
	grunt.loadNpmTasks("grunt-sapui5");
	grunt.registerTask("default", [
		"clean",
		"lint",
		"build"
	]);
};