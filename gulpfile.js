var gulp = require('gulp')
  , nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});
