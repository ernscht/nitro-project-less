'use strict';

const config = {
	assets: {
		'app.css': [
			'+assets/css/example/*s.less',
			'+assets/css/dep/*s.less',
			'assets/css/example/reset.css',
			'assets/css/*.less',
			'patterns/**/css/*.less',
			'patterns/**/css/modifier/*.less',
		],
		'app.js': [
			'assets/js/*.js',
			'patterns/**/js/*.js',
			'patterns/**/js/decorator/*.js',
			'patterns/**/template/*.js',
			'patterns/**/template/partial/*.js',
		],
	},
};

module.exports = config.assets;
