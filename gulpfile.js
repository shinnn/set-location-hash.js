'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var stylish = require('jshint-stylish');

var pkg = require('./package.json');
var banner = [
  '/*!',
  ' * <%= pkg.name %>.js | MIT (c) Shinnosuke Watanabe',
  ' * <%= pkg.homepage %>',
  '*/\n'
].join('\n');

gulp.task('lint', function() {
  gulp.src(['{,src/}*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
  gulp.src(['*.json'])
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
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['src/*.js'], ['transpile']);
  gulp.watch(['{,src/}*.js', '*.json'], ['lint']);
});

gulp.task('build', ['lint', 'transpile']);
gulp.task('default', ['build', 'watch']);
