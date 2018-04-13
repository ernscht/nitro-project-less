'use strict';

const path = require('path');
const fs = require('fs');

const getCwd = () => fs.realpathSync(process.cwd());
// return relative path to dependency
// and make sure hoisting is supported -> https://github.com/lerna/lerna/blob/master/doc/hoist.md
const getRelativeDependencyPath = (dependency) => path.relative(getCwd(), require.resolve(dependency));

const config = {
	assets: {
		"vendor.css": [
			"src/assets/css/reset.css",
			"src/assets/css/*"
		],
		'vendor.js': [
			getRelativeDependencyPath('babel-polyfill/dist/polyfill.min.js'),
			getRelativeDependencyPath('jquery/dist/jquery.min.js'),
			getRelativeDependencyPath('terrific/dist/terrific.min.js'),
			getRelativeDependencyPath('handlebars/dist/handlebars.runtime.min.js'),
		],
		'ui.css': [
			'+src/assets/css/example/*s.less',
			'+src/assets/css/dep/*s.less',
			'src/assets/css/example/reset.css',
			'src/assets/css/*.less',
			'src/patterns/**/css/*.less',
			'src/patterns/**/css/modifier/*.less',
		],
		'ui.js': [
			'src/assets/js/*.js',
			'src/patterns/**/js/*.js',
			'src/patterns/**/js/decorator/*.js',
			'src/patterns/**/template/*.js',
			'src/patterns/**/template/partial/*.js',
		],
	},
};

module.exports = config.assets;
