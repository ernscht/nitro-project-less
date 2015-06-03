var gulp = require('gulp'),
	path = require('path'), 
	precompile = require('gulp-less'), 
	minify = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	jshint = require('gulp-jshint'),
	newer = require('gulp-newer'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cached'),
	remember = require('gulp-remember'),
	header = require('gulp-header'),
	globby = require('globby'),
	karma = require('karma').server,
	server = require('gulp-express'),
	browserSync = require('browser-sync'),
	compression = require('compression'),
	rename = require('gulp-rename'),
	fs = require('fs'),
	Promise = require('es6-promise').Promise,
	cfg = require('./app/core/config');


function getSourceFiles(ext) {
	var assets = [];

	for (var key in cfg.assets) {
		if (cfg.assets.hasOwnProperty(key) && ext === path.extname(key)) {
			var asset = cfg.assets[key],
				result = {
					name: key,
					deps: [],
					src:  []
				};

			for (var fkey in asset) {
				if (asset.hasOwnProperty(fkey)) {
					var filepath = asset[fkey];
					if (filepath.indexOf('+') === 0) {
						result.deps.push(filepath.substr(1));
					}
					else {
						result.src.push(filepath);
					}
				}
			}

			assets.push(result);
		}
	}

	return assets;
}

gulp.task('compile-css', function () {
	var assets = getSourceFiles('.css');

	assets.forEach(function (asset) {
		globby(asset.deps, function(err, paths) {
			var imports = '';

			paths.forEach(function(path) {
				imports += fs.readFileSync(path);
			});

			gulp
				.src(asset.src)
				.pipe(plumber())
				.pipe(header(imports))
				.pipe(cache(asset.name))
				.pipe(precompile())
				.pipe(autoprefixer({
					browsers: ['> 1%', 'last 2 versions', 'ie 9', 'android 4', 'Firefox ESR', 'Opera 12.1'],
					cascade: true
				}))
				.pipe(remember(asset.name))
				.pipe(concat(asset.name))
				.pipe(gulp.dest('public/assets/css/'))
				.pipe(browserSync.reload({stream: true}));

			return gulp;
		});
	});
});



gulp.task('compile-js',   function () {
	var assets = getSourceFiles('.js');

	assets.forEach(function (asset) {
		
		gulp
			.src(asset.src)
		
			.pipe(plumber())
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(concat(asset.name))
			.pipe(gulp.dest('public/assets/js'))
			.pipe(browserSync.reload({stream: true}));
	});

	return gulp;
});

gulp.task('minify-css', ['compile-css'], function () {
	var assets = getSourceFiles('.css');

	assets.forEach(function (asset) {
		gulp
			.src('public/assets/css/' + asset.name)
			.pipe(minify())
			.pipe(rename(asset.name.replace('.css', '.min.css')))
			.pipe(gulp.dest('public/assets/css/'));
	});

	return gulp;
});

gulp.task('minify-js', ['compile-js'], function () {
	var assets = getSourceFiles('.js');

	assets.forEach(function (asset) {
		gulp
			.src('public/assets/js/' + asset.name)
			.pipe(uglify())
			.pipe(rename(asset.name.replace('.js', '.min.js')))
			.pipe(gulp.dest('public/assets/js/'));
	});

	return gulp;
});

gulp.task('minify-img', function () {
	return gulp
		.src('assets/img/**/*')
		.pipe(newer('public/assets/img'))
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true,
			multipass: true,
			svgoPlugins: [{cleanupIDs: false}, {removeUnknownsAndDefaults: false}, {removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/assets/img'));
});

gulp.task('copy-assets',   function () {
	gulp
		.src(['assets/font/**/*'])
		.pipe(newer('public/assets/font'))
		.pipe(gulp.dest('public/assets/font'));

	return gulp;
});

gulp.task('assets', ['copy-assets', 'minify-img', 'minify-css', 'minify-js']);

gulp.task('watch', ['assets'], function () {
	var clearCache = function (e) {
		if ('delete' === e.type) {
			delete cache.caches.scripts[e.path];
			remember.forget('scripts', e.path);
		}
	};


	gulp.watch([
		'config.json'
	]).on('change', function(e) {
		if ('changed' === e.type) {
			cfg = cfg.reload();
			gulp.start('compile-css');
			gulp.start('compile-js');
		}
	});

	gulp.watch([
		'assets/**/*.less',
		'components/**/*.less'
	], ['compile-css'])
		.on('change', function (e) {
			clearCache(e);
		});

	gulp.watch([
		'assets/**/*.js',
		'components/**/*.js'
	], ['compile-js'])
		.on('change', function (e) {
			clearCache(e);
		});

	gulp.watch([
		'views/**/*.html',
		'!' + cfg.nitro.view_partials_directory + '/*.html', // exclude partials
		'views/**/*.json',
		'components/**/*.html',
		'components/**/data/*.json'
	])
		.on('change', function (e) {
			browserSync.reload();
		});

	gulp.watch([
		'assets/img/**/*'
	], ['minify-img']);

	gulp.watch([
		'assets/font/**/*'
	], ['copy-assets']);
});

gulp.task('browser-sync', ['server-watch'], function () {
	var port = process.env.PORT || 8080,
		proxy = process.env.PROXY || 8081;

	browserSync({
		proxy: {
			target: 'localhost:' + port,
			middleware: [compression()]
		},
		port:  proxy
	}, function (err) {
		if (!err) {
			browserSync.notify('Compiling your assets, please wait!');
		}
	});
});

gulp.task('server-run', function () {
	var port = process.env.PORT || 8080;
	server.run(['./server.js'], {env: {PORT: port}});
});

gulp.task('server-watch', ['server-run'], function () {
	var port = process.env.PORT || 8080;
	gulp.watch(['./server.js', './app/core/*.js'], function () {
		server.run(['./server.js'], {env: {PORT: port}});
	});
});

gulp.task('test', ['compile-css', 'compile-js'], function (done) {
	karma.start({
		configFile: path.join(__dirname, 'karma.conf.js'),
		singleRun:  true,
		autoWatch:  false
	}, done);
});

gulp.task('clean', function(){});

gulp.task('develop', ['watch', 'browser-sync']);
gulp.task('production', ['assets', 'server-run']);
gulp.task('build', ['clean'], function() {
	gulp.start('assets');
});
