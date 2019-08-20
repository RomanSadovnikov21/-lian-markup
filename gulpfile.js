const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const rename = require("gulp-rename");
const pug = require("gulp-pug");

sass.compiler = require('node-sass');

function styles() {
  return gulp.src('./src/css/main.css')
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function libsCss() {
  return gulp.src('./src/css/libs/*.css')
    .pipe(concat('libs.css'))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify({ toplevel: true }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function libsJs() {
  return gulp.src('./src/js/libs/*.js')
    .pipe(gulp.dest('./dist/js/libs'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src('./src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('./dist/img'))
}

function fonts() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts'))
}

function clean() {
  return del(['dist/*'])
}

function clear() {
  return cache.clearAll()
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: 'index.html'
    },
    notify: false
  })
  gulp.watch('./src/pug/*.+(jade|pug)', gulp.series('pug'))
  gulp.watch('./src/sass/**/*.+(scss|sass)', gulp.series('sass'))
  gulp.watch('./src/css/*.css', styles)
  gulp.watch('./src/css/libs/*.css', libsCss)
  gulp.watch('./src/js/**/*.js', scripts)
  gulp.watch('./src/js/libs/*.js', libsJs)
  gulp.watch('./src/img/**/*', images)
  gulp.watch('./src/fonts/**/*', fonts)
  gulp.watch('./dist/*.html').on('change', browserSync.reload)
}

gulp.task('pug', function () {
  return gulp.src('./src/pug/*.+(jade|pug)')
      .pipe(pug({pretty: '\t'}))
      .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('styles', styles);
gulp.task('libsCss', libsCss);
gulp.task('scripts', scripts);
gulp.task('libsJs', libsJs);
gulp.task('images', images);
gulp.task('fonts', fonts);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, clear, gulp.parallel(styles, libsCss, scripts, libsJs, images, fonts)));
gulp.task('dev', gulp.series('sass', 'build', 'pug', 'watch'));
