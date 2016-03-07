var browserSync = require('browser-sync');
var cfg = require('../app/core/config');
var utils = require('./utils');

module.exports = function (gulp, plugins) {
	return function () {
		var clearCache = function (e) {
			if ('unlink' === e.event) {
				delete plugins.cached.caches.scripts[e.path];
				plugins.remember.forget('scripts', e.path);
			}
		};

		plugins.watch([
			'config.json'
		], function () {
			utils.reloadConfig();
			cfg = cfg.reload();
			gulp.start('compile-css');
			gulp.start('compile-js');
		});

		plugins.watch([
			'assets/css/**/*.less',
			'components/**/css/**/*.less'
		], function (e) {
			clearCache(e);
			gulp.start('compile-css');
		});

		plugins.watch([
			'assets/js/**/*.js',
			'components/**/js/**/*.js',
			'components/**/template/**/*.hbs'
		], function () {
			gulp.start('compile-js');
		});

		plugins.watch([
			'views/**/*.' + cfg.nitro.view_file_extension,
			'!' + cfg.nitro.view_partials_directory + '/*.' + cfg.nitro.view_file_extension, // exclude partials
			'views/_data/**/*.json',
			'components/**/*.' + cfg.nitro.view_file_extension,
			'!components/**/template/**/*.hbs',
			'components/**/_data/*.json'
		], function () {
			browserSync.reload();
		});

		plugins.watch([
			'assets/img/**/*'
		], function () {
			gulp.start('minify-img');
		});

		plugins.watch([
			'assets/font/**/*'
		], function () {
			gulp.start('copy-assets');
		});
	};
};
