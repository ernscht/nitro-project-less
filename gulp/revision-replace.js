'use strict';

const utils = require('./utils');
const tmpDirectory = utils.getTmpDirectory('manifest');
const distDirectory = 'dist/dist';
const merge = require('merge-stream');

module.exports = (gulp, plugins) => {
	return () => {

		const manifest = gulp.src(`${distDirectory}/rev-manifest.json`);

		const styles = gulp.src('public/assets/css/*.css')
			.pipe(plugins.revReplace({manifest: manifest}))
			.pipe(plugins.rename((path) => {
				path.basename = path.basename.replace(/app/, 'app.rev');
			}))
			.pipe(gulp.dest('public/assets/css/'));

		const scripts = gulp.src('public/assets/js/*.js')
			.pipe(plugins.rename((path) => {
				path.basename = path.basename.replace(/app/, 'app.rev');
			}))
			.pipe(gulp.dest('public/assets/js/'));

		return merge(styles, scripts);
	};
};
