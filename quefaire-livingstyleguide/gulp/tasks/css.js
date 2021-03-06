'use strict';

var autoprefixer = require('autoprefixer');
var config       = require('../config');
var gulp         = require('gulp');
var path         = require('path');
var pixrem       = require('pixrem');
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');

// Build minified CSS files
gulp.task('build:css', function () {
  gulp.src([config.css.input])
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([
      pixrem,
      autoprefixer
    ]))
    .pipe(gulp.dest(path.join(config.build.assets.css)));
});

// Build CSS files (not minified)
gulp.task('build:css:expanded', function () {
  gulp.src([config.css.input])
    .pipe(sass())
    .pipe(postcss([
      pixrem,
      autoprefixer
    ]))
    .pipe(gulp.dest(path.join(config.build.assets.cssExpanded)));
});
