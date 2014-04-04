'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var homepage = require('./package.json').homepage;
var banner = [
  '/*!',
  ' * set-location-hash.js | MIT (c) Shinnosuke Watanabe',
  ' * <%= homepage %>',
  '*/\n'
].join('\n');

gulp.task('lint', function() {
  gulp.src('{,src/}*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
  gulp.src('*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('transpile', function() {
  gulp.src(['src/*.js'])
    .pipe($.es6Transpiler())
    .pipe($.wrapUmd({
      deps: [],
      exports: 'setLocationHash',
      namespace: 'setLocationHash'
    }))
    .pipe($.header(banner, {homepage: homepage}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['transpile']);
  gulp.watch(['{,src/}*.js', '*.json'], ['lint']);
});

gulp.task('build', ['lint', 'transpile']);
gulp.task('default', ['build', 'watch']);
