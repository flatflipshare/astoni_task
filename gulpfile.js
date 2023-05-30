'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const del = require('del');

const options = require('./options');
const libs = require('./libs');

const paths = {
    sass: {
        src: options.srcDir + '/sass',
        dest: options.destDir + '/css',
        mask: '/*.+(sass|scss)'
    },
    js: {
        src: options.srcDir + '/js',
        dest: options.destDir + '/js',
        mask: '/*.js'
    },
    html: {
        src: options.srcDir + '/templates',
        dest: options.destDir + '/',
        mask: '/**/[^_]*.+(html|php)'
    },
    fonts: {
        src: options.srcDir + '/fonts',
        dest: options.destDir + '/fonts',
        mask: '/**/*.*'
    },
    watch: {
        sass: options.srcDir + '/sass/**/*.+(sass|scss)',
        js: options.srcDir + '/js/**/*.js',
        img: options.srcDir + '/img/**/*.+(png|jpg|jpeg|gif|svg)',
        html: options.srcDir + '/**/*.+(html|php)',
        fonts: options.srcDir + '/fonts/**/*'
    },
    vendor: {
        css: 'vendor.min.css',
        js: 'vendor.min.js'
    }
};

const handleError = function (err) {
    notify({
        title: 'Gulp Task Error',
        message: '!!!ERROR!!! Check the console.'
    }).write(err);
    console.log(err.toString());
    this.emit('end');
};

function styles() {
	return gulp.src(paths.sass.src + paths.sass.mask, { sourcemaps: true })
		.pipe(concat('app.min.css'))
		.pipe(sass({outputStyle: 'compressed'}).on('error', handleError))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
		.pipe(gulp.dest(paths.sass.dest, { sourcemaps: '.' }))
}

function vendorCSS() {
	libs.styles.length === 0 ? libs.styles = '.' : libs.styles = libs.styles;
	return gulp.src(libs.styles, {allowEmpty: true})
		.pipe(concat(paths.vendor.css))
		.pipe(sass({outputStyle: 'compressed'}).on('error', handleError))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
		.pipe(gulp.dest(paths.sass.dest))
}

function scripts() {
	return gulp.src(paths.js.src + paths.js.mask, { sourcemaps: true })
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest(paths.js.dest, { sourcemaps: '.' }))
}

function vendorJS() {
	libs.scripts.length === 0 ? libs.scripts = '.' : libs.scripts = libs.scripts;
	return gulp.src(libs.scripts, {allowEmpty: true})
		.pipe(concat(paths.vendor.js))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js.dest))
}

function html() {
	if (options.useTemplates) {
    return gulp.src(paths.html.src + paths.html.mask)
      .pipe(gulp.dest(paths.html.dest))
	} else {
        return Promise.resolve();
    }
}

function fonts() {
	return gulp.src(paths.fonts.src + paths.fonts.mask)
    .pipe(gulp.dest(paths.fonts.dest))
}

function clean() {
	return del([ options.destDir + '/**/*']);
}

function watch() {
	build();
	gulp.watch([paths.watch.sass], styles)
	gulp.watch([paths.watch.js], scripts)
	gulp.watch([paths.watch.fonts], fonts)
	if (options.useTemplates) {
		gulp.watch([paths.watch.html], html)
	}
}

const build = gulp.series(clean, gulp.parallel(vendorCSS, vendorJS, styles, scripts, html, fonts));

exports.styles = styles;
exports.vendorCSS = vendorCSS;
exports.scripts = scripts;
exports.vendorJS = vendorJS;
exports.watch = watch;
exports.build = build;

exports.default = build;