var gulp = require('gulp'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade');
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    browserSync = require('browser-sync');
	reload = browserSync.reload;

gulp.task('styles',function(){
  gulp.src('./app/src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./app/dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'))
    .pipe(notify('Style task complete'))
    .pipe(reload({ stream:true }));

})

gulp.task('scripts',function(){
  gulp.src('./app/src/coffee/*.coffee')
    .pipe(coffee({bare: true}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app/dist/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/dist/js'))
    .pipe(notify('Scripts task complete'))
    .pipe(reload({ stream:true }));
})

gulp.task('templates', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./app/views/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./app/'))
    .pipe(notify("Templates task complete"))
    .pipe(reload({ stream:true }));
});




gulp.task('clean',function(cb){
  del(['./app/dist'],cb)
})


gulp.task('default',['clean'],function(){
  gulp.start('styles','scripts','templates');
})

// 监视文件改动并重新载入
gulp.task('serve',['watch'],function() {
  browserSync({
    server: {
    	baseDir: 'app'
    }


  });
  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);

});

gulp.task('watch',function(){
  gulp.watch('./app/src/sass/*.scss',['styles']);
  gulp.watch('./app/src/coffee/*.coffee',['scripts']);
  gulp.watch('./app/views/*.jade',['templates']);
})