const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// Functions
const buildStyles = () => {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
};

const buildJavascript = () => {
  return gulp.src(['js/plugins.js', 'js/main.js'])
    .pipe(concat('scripts.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
};

const watch = () => {
  gulp.watch('scss/*.scss', buildStyles);
  gulp.watch(['js/**/*.js', '!js/scripts.js'], buildJavascript);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
};

// Tasks
gulp.task('styles', buildStyles);
gulp.task('javascript', buildJavascript);
gulp.task('build', gulp.parallel('styles', 'javascript'))
gulp.task('server', server);
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('build','watch', 'server'));
