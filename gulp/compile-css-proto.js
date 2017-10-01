'use strict';

const utils = require('./utils');
const globby = require('globby');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const config = require('config');
const lintCss = Boolean(config.get('code.validation.stylelint.live'));
const cssFiles = [
	'src/proto/css/*.less',
	'src/patterns/**/proto/**/*.less',
];
const cssDependencies = [
	'src/assets/css/example/*s.less',
	'src/assets/css/dep/*s.less',
];
const assetName = 'prototype.css';
const browserSync = utils.getBrowserSyncInstance();
const browserCompatibility = utils.getBrowserCompatibility();
const processors = [
	autoprefixer({
		browsers: browserCompatibility,
		cascade: true,
	}),
];

module.exports = (gulp, plugins) => {
	return () => {

		let imports = '';
		globby.sync(cssDependencies).forEach((path) => {
			imports += fs.readFileSync(path, 'utf8');
		});

		return gulp.src(cssFiles, { base: '.' })
			.pipe(plugins.plumber())
			.pipe(plugins.cached(assetName))
			.pipe(plugins.if(lintCss, plugins.stylelint({
				failAfterError: false,
				syntax: 'less',
				reporters: [
					{
						formatter: 'string',
						console: true,
					},
				],
			})))
			.pipe(plugins.header(imports, false))
			.pipe(plugins.less().on('error', (err) => {
				console.log(err.message);
				this.emit('end');
			}))
			.pipe(plugins.postcss(processors))
			.pipe(plugins.remember(assetName))
			.pipe(plugins.concat(assetName))
			.pipe(plugins.plumber.stop())
			.pipe(gulp.dest('public/proto/css/'))
			.on('end', () => {
				if (config.get('nitro.mode.livereload')) {
					browserSync.reload('*.css');
				}
			});
	};
};
