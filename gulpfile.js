'use strict';

const gulp = require('gulp');
const minifyHtml = require('gulp-minify-html');
const minifyCss = require('gulp-clean-css');
const usemin = require('gulp-usemin');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
// const cleanDest = require('gulp-clean-dest'); // TODO
const path = require('path');

// Images relative directory
const IMG_DIR = '/img';

// App source directory
const SRC = path.join(__dirname, './app/src');
const IMG = path.join(__dirname, `./app/${IMG_DIR}/*.*`);

// Distribution directory
const DIST_DIR = path.join(__dirname, './public/dist');
// Images dist directory
const IMG_DIST = `${DIST_DIR}${IMG_DIR}`;

// define gulp task
gulp.task('app-bundle', function() {
  gulp.src(`${SRC}/index.html`)
		.pipe(usemin({
      assetsDir: 'app',
      cssVendor: [minifyCss(), rev()],
      cssApp: [minifyCss(), rev()],
      html: [minifyHtml({ empty: true })],
      jsApp: [uglify(), rev()],
      jsVendor: [uglify(), rev()]
    }))
		.pipe(gulp.dest(DIST_DIR));
});

gulp.task('app-copy-img', function() {
  gulp.src(IMG)
      .pipe(gulp.dest(IMG_DIST));
});

gulp.task('app-copy-html', function() {
  gulp.src(`${SRC}/*/*.html`)
      .pipe(gulp.dest(DIST_DIR));
});

const TASKS = ['app-copy-img', 'app-copy-html', 'app-bundle'];

return gulp.task('default', TASKS);