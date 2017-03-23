'use strict';

const utils = require('./utils');
const Promise = require('es6-promise').Promise;
const globby = require('globby');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const bannerData = {
	date: new Date().toISOString().slice(0, 19),
	pkg: require('../package.json'),
};
const banner = ['/*! ',
	' * <%= bannerData.pkg.name %>',
	' * @version v<%= bannerData.pkg.version %>',
	' * @date <%= bannerData.date %>',
	' */',
	''].join('\n');

module.exports = (gulp, plugins) => {
	return () => {
		const assets = utils.getSourcePatterns('css');
		const browserCompatibility = utils.getBrowserCompatibility();
		const browserSync = utils.getBrowserSyncInstance();
		let promises = [];

		assets.forEach((asset) => {
			promises.push(new Promise((resolve) => {
				const processors = [
					autoprefixer({
						browsers: browserCompatibility,
						cascade: true
					})
				];
				let imports = '';

				globby.sync(asset.deps).forEach((path) => {
					imports += fs.readFileSync(path, 'utf8');
				});

				gulp.src(asset.src, {base: '.'})
					.pipe(plugins.plumber())
					.pipe(plugins.cached(asset.name))
					.pipe(plugins.sourcemaps.init({loadMaps: true}))
					.pipe(plugins.stylelint({
						failAfterError: false,
						syntax: 'less',
						reporters: [
							{formatter: 'string', console: true}
						]
					}))
					.pipe(plugins.header(imports, false))
					.pipe(plugins.less().on('error', (err) => {
						console.log(err.message);
						this.emit('end');
					}))
					.pipe(plugins.postcss(processors))
					.pipe(plugins.remember(asset.name))
					.pipe(plugins.concat(asset.name))
					.pipe(plugins.header(banner, { bannerData : bannerData } ))
					.pipe(plugins.sourcemaps.write('.'))
					.pipe(plugins.plumber.stop())
					.pipe(gulp.dest('public/assets/css/'))
					.on('end', () => {
						resolve();
					});
			}));
		});

		return Promise.all(promises)
			.then(() => browserSync.reload('*.css'));
	};
};
