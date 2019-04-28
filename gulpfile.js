const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Functions
const buildStyles = () => {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'));
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
};

// Tasks
gulp.task('styles', buildStyles);
gulp.task('server', server);
