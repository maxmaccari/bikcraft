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
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
};

const watch = () => {
  gulp.watch('scss/*.scss', buildStyles);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
}

// Tasks
gulp.task('styles', buildStyles);
gulp.task('server', server);
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('watch', 'server'));
