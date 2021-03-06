import babelify    from 'babelify';
import bootstrap   from 'bootstrap-styl';
import browserify  from 'gulp-browserify';
import eslint      from 'gulp-eslint';
import gulp        from 'gulp';
import mocha       from 'gulp-mocha';
import reactify    from 'reactify';
import rimraf      from 'gulp-rimraf';
import runSequence from 'run-sequence';
import serve       from 'gulp-serve';
import stylus      from 'gulp-stylus';

const paths = {
  build: './build/',
  root: './',
  src: 'app/**/*.js',
  src_root: './app/index.js',
  static: './static/',
  style: './style/style.styl',
  test: './test/**/*_spec.js'
};

gulp.task('default', ['serve']);

gulp.task('build', () => {
  return runSequence('clean', 'eslint', ['static', 'src', 'stylus']);
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

gulp.task('serve', ['build', 'watch'],
  serve({root: [paths.build], port: 8080}));

gulp.task('src', () => {
  return gulp.src(paths.src_root, {base: paths.root})
          .pipe(browserify({
            paths: ['./app', 'node_modules'],
            transform: [babelify, reactify],
            debug: true
          }))
          .pipe(gulp.dest(paths.build));
});

gulp.task('static', () => {
  return gulp.src(`${paths.static}*`, {base: paths.static})
          .pipe(gulp.dest(paths.build));
});

gulp.task('stylus', () => {
  return gulp.src(paths.style, {base: paths.root})
          .pipe(stylus({
            use: bootstrap()
          }))
          .pipe(gulp.dest(paths.build));
});

gulp.task('test', ['testlint'], () => {
  return gulp.src(paths.test, {base: paths.root})
          .pipe(mocha({
            require: ['./test/_bootstrap.js'],
            reporter: 'nyan'}))
});

gulp.task('testlint', () => {
  return gulp.src(paths.test)
          .pipe(eslint())
          .pipe(eslint.format())
          .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
  gulp.watch(`${paths.static}*`, ['static']);
  gulp.watch(paths.src, ['eslint', 'src']);
  gulp.watch(paths.style, ['stylus']);
});
