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
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cached'),
	remember = require('gulp-remember'),
	header = require('gulp-header'),
	karma = require('karma').server,
	server = require('gulp-express'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	fs = require('fs');

function getSourceFiles(ext) {
	var assetsConfig = require('./config.json').assets,
		assets = [];

	for (var key in assetsConfig) {
		if (assetsConfig.hasOwnProperty(key) && ext === path.extname(key)) {
			var asset = assetsConfig[key],
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
		var imports = '';

		asset.deps.forEach(function (src) {
			imports += fs.readFileSync(src);
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
			.pipe(gulp.dest('./public/latest/'))
			.pipe(browserSync.reload({stream: true}));
	});

	return gulp;
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
			.pipe(gulp.dest('./public/latest'))
			.pipe(browserSync.reload({stream: true}));
	});

	return gulp;
});

gulp.task('minify-css', ['compile-css'], function () {
	var assets = getSourceFiles('.css');

	assets.forEach(function (asset) {
		gulp
			.src('./public/latest/' + asset.name)
			.pipe(minify())
			.pipe(rename(asset.name.replace('.css', '.min.css')))
			.pipe(gulp.dest('./public/latest/'));
	});

	return gulp;
});

gulp.task('minify-js', ['compile-js'], function () {
	var assets = getSourceFiles('.js');

	assets.forEach(function (asset) {
		gulp
			.src('./public/latest/' + asset.name)
			.pipe(uglify())
			.pipe(rename(asset.name.replace('.js', '.min.js')))
			.pipe(gulp.dest('./public/latest/'));
	});

	return gulp;
});

gulp.task('minify-img', function () {
	return gulp
		.src('./assets/img/**/*.*')
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./assets/img'));
});

gulp.task('watch', ['compile-css', 'compile-js'], function () {
	var clearCache = function (e) {
		if ('delete' === e.type) {
			delete cache.caches.scripts[e.path];
			remember.forget('scripts', e.path);
		}
	};

	gulp.watch([
		'./config.json',
		'./assets/**/*.less',
		'./components/**/*.less'
	], ['compile-css'])
		.on('change', function (e) {
			clearCache(e);
		});

	gulp.watch([
		'./config.json',
		'./assets/**/*.js',
		'./components/**/*.js'
	], ['compile-js'])
		.on('change', function (e) {
			clearCache(e);
		});

	gulp.watch([
		'./views/**/*.html',
		'./views/**/*.json',
		'./components/**/*.html',
		'./components/**/data/*.json'
	])
		.on('change', function (e) {
			browserSync.reload();
		});
});

gulp.task('browser-sync', ['server-watch'], function () {
	var port = process.env.PORT || 8080,
		proxy = process.env.PROXY || 8081;

	browserSync({
		proxy: 'localhost:' + port,
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

gulp.task('develop', ['browser-sync', 'watch']);
gulp.task('production', ['minify-css', 'minify-js', 'server-run']);
