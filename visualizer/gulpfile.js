var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('index', function () {
  var target = gulp.src('./truss.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/*.js', './src/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});