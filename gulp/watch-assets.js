var cfg = require('../app/core/config');
var utils = require('./utils');
var browserSync = utils.getBrowserSyncInstance();

module.exports = function (gulp, plugins) {
	return function () {
		var isDependentStyleSource = function(file) {
			var isDependent = false;
			var cssAssets = utils.getSourcePatterns('css');
			cssAssets.forEach(function (asset) {
				asset.deps.forEach(function(dep) {
					if ( file.replace(/\\/g, '/').endsWith(dep) ) {
						isDependent = true;
					}
				});
			});

			return isDependent;
		};
		var clearCache = function (e) {
			if (
				'unlink' === e.event ||
				'add' === e.event ||
				e.path.endsWith('config.json') ||
				isDependentStyleSource(e.path)
			) {
				// forget all
				plugins.cached.caches = {};
				var cssAssets = utils.getSourcePatterns('css');
				cssAssets.forEach(function (asset) {
					if (plugins.remember.cacheFor(asset.name)) {
						plugins.remember.forgetAll(asset.name);
					}
				});
			}
		};

		plugins.watch([
			'config.json'
		], function (e) {
			cfg = utils.reloadConfig();
			clearCache(e);
			utils.updateSourcePatterns();
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
