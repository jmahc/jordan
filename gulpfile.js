var gulp =                  require('gulp')
  , nodemon =               require('gulp-nodemon')
  , autoprefixer =          require('autoprefixer')
  , minifyCSS =             require('gulp-minify-css')
  , less =                  require('gulp-less')
  , prefix =                require('gulp-autoprefixer')
  , plumber =               require('gulp-plumber')
  , uglify =                require('gulp-uglify')
  , rename =                require('gulp-rename');

gulp.task('default', ['less', 'compress', 'start']);

gulp.task('start', function () {
  nodemon({
    script: 'app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

function onError(err) {
    console.log(err);
}

gulp.task('less', function(){
    return gulp.src('./public/css/main.less')
        .pipe(less())
        .pipe(prefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(rename('site.min.css'))
        .pipe(gulp.dest('./public/css/'))
        .pipe(plumber({
            errorHandler: onError
        }))
});

gulp.task('compress', function() {
  return gulp.src('./public/libs/script.js')
    .pipe(uglify())
    .pipe(rename('site.min.js'))
    .pipe(gulp.dest('./public/libs/'))
    .pipe(plumber({
        errorHandler: onError
    }))
});
