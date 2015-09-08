var gulp = require('gulp');
var md = require('gulp-markdown');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var wrapper = require('gulp-wrapper');
var fs = require('fs');
var sass = require('gulp-sass');

gulp.task('build:css', function(cb) {
  return gulp.src('src/_assets/styles/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/styles/'),cb);
});

gulp.task('build:js',function(cb) {
  return gulp.src(['bower_components/jquery/dist/jquery.min.js','src/_assets/scripts/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/scripts/'),cb);
});

gulp.task('build:html', ['build:css','build:js'], function() {
  fs.readFile('./dist/styles/styles.css',function(errorCss,styleFiles) {
    if(!errorCss) {
      fs.readFile('./dist/scripts/all.js', function(errorJs,scriptFiles) {
        if(!errorJs) {
          var styles = new Buffer(styleFiles).toString();
          var scripts = new Buffer(scriptFiles).toString();
          gulp.src('src/**/*.md')
            .pipe(md())
            .pipe(replace(/\[ \]/g,'<input type="checkbox">'))
            .pipe(replace(/\[x\]/g,'<input type="checkbox" checked>'))
            .pipe(wrapper({
              header:'<html>\n<head>\n<meta charset="UTF-8">\n<style>' + styles + '</style></head>\n<body>',
              footer:'<script>' + scripts + '</script></body>\n</html>'
            }))
            .pipe(gulp.dest('dist'));
        } else {
          console.log(errorJS);
        }
      });
    } else {
      console.log(errorCss);
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.*',['build:html']);
});


gulp.task('default',['build:html','watch']);
