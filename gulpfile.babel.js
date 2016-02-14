'use strict';

import babelify from 'babelify';
import bootstrap from 'bootstrap-styl';
import browserify from 'gulp-browserify';
import rimraf from 'gulp-rimraf';
import gulp from 'gulp';
import reactify from 'reactify';
import runSequence from 'run-sequence';
import serve from 'gulp-serve';
import stylus from 'gulp-stylus';

const paths = {
  build: 'build/',
  index: 'index.html',
  root: './',
  src: 'src/**/*.js',
  src_root: 'src/index.js',
  style: 'style/style.styl'
};

gulp.task('default', ['serve']);

gulp.task('build', () => runSequence('clean', ['index', 'src', 'stylus']));

gulp.task('clean', () => {
  return gulp.src(paths.build, {read: false})
    .pipe(rimraf());
});

gulp.task('index', () => copyToBuild(paths.index, paths.build, paths.root));

gulp.task('stylus', () => {
  return gulp.src(paths.style, {base: paths.root})
    .pipe(stylus({
        use: bootstrap()
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('serve', ['build', 'watch'], serve({root: [paths.build], port: 8080}));

gulp.task('src', () => {
  return gulp.src(paths.src_root, {base: paths.root})
    .pipe(browserify({
      paths: ['./src', 'node_modules'],
      transform: [babelify, reactify],
      debug: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('watch', () => {
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.src, ['src']);
  gulp.watch(paths.style, ['stylus']);
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
