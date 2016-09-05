'use strict';

const utils = require('./utils');
const Promise = require('es6-promise').Promise;

module.exports = (gulp, plugins) => {
	return () => {
		const assets = utils.getSourcePatterns('js');
		const browserSync = utils.getBrowserSyncInstance();
		let promises = [];

		assets.forEach((asset) => {
			
			promises.push(new Promise((resolve) => {
				gulp.src(asset.src, {base: '.'})
					.pipe(plugins.plumber())
					.pipe(plugins.cached(asset.name))
					.pipe(plugins.sourcemaps.init({loadMaps: true}))
					.pipe(plugins.jshint())
					.pipe(plugins.jshint.reporter('jshint-stylish'))
					.pipe(plugins.remember(asset.name))
					.pipe(plugins.concat(asset.name))
					.pipe(plugins.sourcemaps.write('.'))
					.pipe(gulp.dest('public/assets/js'))
					.on('end', () => {
						resolve();
					})
					.pipe(browserSync.stream());
			}));
		});

		return Promise.all(promises);
	};
};
