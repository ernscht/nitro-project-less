'use strict';

const utils = require('./utils');
const tmpDirectory = utils.getTmpDirectory('manifest');
const distDirectory = 'dist/dist';

module.exports = (gulp, plugins) => {
	return () => {
		return gulp.src('public/assets/**/*')
			.pipe(plugins.rev())
			// .pipe(plugins.revFormat({
			// 	prefix: '~',
			// 	suffix: '~cache',
			// 	lastExt: false
			// }))
			.pipe(gulp.dest(distDirectory));
			//.pipe(plugins.rev.manifest())
			//.pipe(gulp.dest(tmpDirectory));
	};
};
