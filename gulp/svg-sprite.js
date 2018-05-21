'use strict';

const path = require('path');
const config = require('config');
const merge = require('merge-stream');

module.exports = (gulp, plugins) => {
	return () => {
		const svgIcons = gulp
			.src(config.get('gulp.svgSprite.src'))
			.pipe(plugins.svgmin((file) => {
				const prefix = path.basename(file.relative, path.extname(file.relative));
				return {
					plugins: [
						{
							removeDoctype: true,
						}, {
							cleanupIDs: {
								prefix: `${prefix}-`,
								minify: true,
							},
						},
					],
				};
			}))
			.pipe(plugins.svgstore({ inlineSvg: true }))
			.pipe(gulp.dest(config.get('gulp.svgSprite.dest')));

		const svgIcos = gulp
			.src('src/patterns/atoms/ico/img/icos/*.svg')
			.pipe(plugins.svgmin((file) => {
				const prefix = path.basename(file.relative, path.extname(file.relative));
				return {
					plugins: [
						{
							removeDoctype: true,
						}, {
							cleanupIDs: {
								prefix: `${prefix}-`,
								minify: true,
							},
						},
					],
				};
			}))
			.pipe(plugins.svgstore({ inlineSvg: true }))
			.pipe(gulp.dest('public/assets/svg'));

		return merge(svgIcons, svgIcos);
	};
};
