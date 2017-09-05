'use strict';

const config = {
	assets: {
		'app.css': [
			'+src/assets/css/example/*s.less',
			'+src/assets/css/dep/*s.less',
			'src/assets/css/example/reset.css',
			'src/assets/css/*.less',
			'src/patterns/**/css/*.less',
			'src/patterns/**/css/modifier/*.less',
		],
		'app.js': [
			'src/assets/js/*.js',
			'src/patterns/**/js/*.js',
			'src/patterns/**/js/decorator/*.js',
			'src/patterns/**/template/*.js',
			'src/patterns/**/template/partial/*.js',
		],
	},
};

module.exports = config.assets;
