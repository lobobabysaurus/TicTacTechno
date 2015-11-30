'use strict';

import babelify from 'babelify';
import browserify from 'gulp-browserify'
import rimraf from 'gulp-rimraf';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import reactify from 'reactify';
import runSequence from 'run-sequence';
import serve from 'gulp-serve';

const paths = {
  build: 'build/',
  index: 'index.html',
  root: './',
  src: 'src/index.js',
  style: 'style/*.css'
};

gulp.task('default', ['serve']);

gulp.task('build', () => runSequence('eslint', 'clean', ['index', 'src', 'style']));

gulp.task('clean', () => {
  return gulp.src(paths.build, {read: false})
    .pipe(rimraf());
});

gulp.task('eslint', () => {
  return gulp.src(paths.src)
    .pipe(eslint({
      ecmaFeatures: {
        'arrowFunctions': true,
        'classes': true,
        'jsx': true,
        'modules': true
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('index', () => copyToBuild(paths.index, paths.build, paths.root));

gulp.task('serve', ['build', 'watch'], serve({root: [paths.build], port: 8080}));

gulp.task('src', () => {
  return gulp.src(paths.src, {base: paths.root})
    .pipe(browserify({
      transform: [babelify, reactify],
      debug: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('style', () => copyToBuild(paths.style, paths.build, paths.root));

gulp.task('watch', () => {
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.src, ['eslint', 'src']);
  gulp.watch(paths.style, ['style']);
});

/**
 * Copy files to build destination
 *
 * @param {String} src Pattern to copy files from
 * @param {String} dest Directory to copy files to
 * @param {String} base Base for copying directory structure (Optional)
 */
const copyToBuild = (src, dest, base) => {
  return gulp.src(src, {base: base})
    .pipe(gulp.dest(dest));
};
