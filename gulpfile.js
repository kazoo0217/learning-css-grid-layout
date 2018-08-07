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
        browsers: ['last 2 major versions', 'ie >= 11'],
        grid: true,
        cascade: false
      })
    ]))
    .pipe(gulp.dest('./docs/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./docs"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync','sass:watch'], function () {
  gulp.watch("./docs/*.html", ['bs-reload']);
  gulp.watch("./docs/css/*.css", ['bs-reload']);
});
