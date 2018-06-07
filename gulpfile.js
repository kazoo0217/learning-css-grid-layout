var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssGapProperties = require('postcss-gap-properties');

gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      postcssGapProperties(),
      autoprefixer({
        browsers: ['last 2 major versions', 'ie >= 10'],
        grid: true,
        cascade: false
      })
    ]))
    .pipe(gulp.dest('./html/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./html"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync','sass:watch'], function () {
  gulp.watch("./html/*.html", ['bs-reload']);
  gulp.watch("./html/css/*.css", ['bs-reload']);
});
