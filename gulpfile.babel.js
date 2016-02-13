'use strict';

import babelify from 'babelify';
import browserify from 'gulp-browserify'
import rimraf from 'gulp-rimraf';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import reactify from 'reactify';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import serve from 'gulp-serve';

const paths = {
  build: 'build/',
  index: 'index.html',
  root: './',
  src: 'src/**/*.js'
  src_root: 'src/index.js',
  style: 'style/style.scss'
};

gulp.task('default', ['serve']);

gulp.task('build', () => runSequence('eslint', 'clean', ['index', 'src', 'sass']));

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

gulp.task('sass', () => {
  return gulp.src(paths.style, {base: paths.root})
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.build));
});

gulp.task('serve', ['build', 'watch'], serve({root: [paths.build], port: 8080}));

gulp.task('src', () => {
  return gulp.src(paths.src, {base: paths.root})
    .pipe(browserify({
      paths: ['./src', 'node_modules'],
      transform: [babelify, reactify],
      debug: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch', () => {
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.src_root, ['eslint', 'src']);
  gulp.watch(paths.style, ['sass']);
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
