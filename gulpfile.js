const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const nunjucksRender = require('gulp-nunjucks-render');
const htmlmin = require('gulp-htmlmin');

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
    'src/js/vendor/*.js',
    'src/js/main.js'
  ]
  return gulp.src(files)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/'))
    .pipe(browserSync.stream());
};

const buildPages = () => {
  return gulp.src('src/pages/**/*.html')
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
}

const minifyImages = () => {
  return gulp.src('src/img/**/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('public/img'))
    .pipe(browserSync.stream());
}

const copyStatic = () => {
  return gulp.src('src/static/**/*')
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.stream());
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
};

const watch = () => {
  gulp.watch('src/scss/**/*.scss', buildStyles);
  gulp.watch('src/js/**/*.js', buildJavascript);
  gulp.watch(['src/pages/**/*.html', 'src/templates/**/*'], buildPages);
  gulp.watch('src/static/**/*', copyStatic);
};

// Tasks
gulp.task('styles', buildStyles);
gulp.task('javascript', buildJavascript);
gulp.task('pages', buildPages);
gulp.task('images', minifyImages);
gulp.task('static', copyStatic);
gulp.task('build',
  gulp.series('static', 'images', 'styles', 'javascript', 'pages'))
gulp.task('server', server);
gulp.task('watch', watch);
gulp.task('default', gulp.parallel('build','watch', 'server'));
