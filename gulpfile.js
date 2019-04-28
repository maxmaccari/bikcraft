const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Functions
const buildStyles = () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.stream());
};

const buildJavascript = () => {
  const files = [
    'node_modules/jquery/dist/jquery.js',
    'src/js/plugins.js',
    'src/js/main.js'
  ]
  return gulp.src(files)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.stream());
}

const copyStatic = () => {
  return gulp.src('src/static/**/*')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
};

const watch = () => {
  gulp.watch('src/scss/*.scss', buildStyles);
  gulp.watch('src/js/**/*.js', buildJavascript);
  gulp.watch('src/static/**/*', copyStatic);
};

// Tasks
gulp.task('styles', buildStyles);
gulp.task('javascript', buildJavascript);
gulp.task('static', copyStatic);
gulp.task('build', gulp.parallel('static', 'styles', 'javascript'))
gulp.task('server', server);
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('build','watch', 'server'));
