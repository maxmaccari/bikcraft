const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');

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
  const files = [
    'node_modules/jquery/dist/jquery.js',
    'js/plugins.js',
    'js/main.js'
  ]
  return gulp.src(files)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
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
