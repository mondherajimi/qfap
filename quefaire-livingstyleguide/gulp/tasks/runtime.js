'use strict';

var browserify  = require('browserify');
var config      = require('../config');
var fs          = require('fs');
var gulp        = require('gulp');
var path        = require('path');
var templatizer = require('templatizer');

// // Build the runtime for use with Browserify
// // see http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds
// gulp.task('build:runtime', ['templatize:runtime'], function () {
//   // TODO: below, rename "Styleguide" with your project JS namespace
//   browserify(path.join(config.tmp.output, config.runtime.filenameTmp), {standalone: 'Styleguide.templates'})
//     .bundle()
//     .pipe(fs.createWriteStream(path.join(config.tmp.output, config.runtime.filename)));
// });

// Compile all the jade templates to a single JS file in tmp
gulp.task('build:runtime', function (cb) {
  templatizer(
    config.src + '/@(components)/!(_*)/*.jade',
    path.join(config.tmp.output, config.runtime.filename), {
      transformMixins: true,
      globOptions: { ignore: ['**/index.jade'] }
    }, cb);
});

// Compile selected jade templates for use client-side
gulp.task('build:clients', ['copy:config'], function (cb) {
  templatizer(
    config.src + '/@(modules)/@(' + config.runtime.clientModules.join('|') + ')/*.jade',
    path.join(config.src, 'javascript', config.runtime.clientFilename), {
      transformMixins: true,
      globOptions: { ignore: ['**/index.jade'] }
    }, cb);
});

