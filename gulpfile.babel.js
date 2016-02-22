'use strict';

import babelify from 'babelify';
import bootstrap from 'bootstrap-styl';
import browserify from 'gulp-browserify';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import reactify from 'reactify';
import rimraf from 'gulp-rimraf';
import runSequence from 'run-sequence';
import serve from 'gulp-serve';
import stylus from 'gulp-stylus';

const paths = {
  build: './build/',
  index: './index.html',
  root: './',
  src: 'src/**/*.js',
  src_root: './src/index.js',
  style: './style/style.styl',
  test: './test/**/*_spec.js'
};

gulp.task('default', ['serve']);

gulp.task('build', () => {
  return runSequence('clean', 'eslint', ['index', 'src', 'stylus']);
});

gulp.task('clean', () => {
  return gulp.src(paths.build, {read: false})
    .pipe(rimraf());
});

gulp.task('eslint', () => {
  return gulp.src(paths.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('index', () => {
  return gulp.src(paths.index, {base: paths.root})
    .pipe(gulp.dest(paths.build));
});

gulp.task('serve', ['build', 'watch'],
  return serve({root: [paths.build], port: 8080}));

gulp.task('src', () => {
  return gulp.src(paths.src_root, {base: paths.root})
    .pipe(browserify({
      paths: ['./src', 'node_modules'],
      transform: [babelify, reactify],
      debug: true
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('stylus', () => {
  return gulp.src(paths.style, {base: paths.root})
    .pipe(stylus({
        use: bootstrap()
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('test', () => {
  return gulp.src(paths.test, {base: paths.root})
    .pipe(mocha({
      require: ['./test/_bootstrap.js'],
      reporter: 'nyan'}));
});

gulp.task('watch', () => {
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.src, ['eslint', 'src']);
  gulp.watch(paths.style, ['stylus']);
});
