var gulp = require('gulp');
// var coffee = require('gulp-coffee');
//$ npm install gulp-compass --save-dev
// var sass = require('gulp-ruby-sass');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require("gulp-spritesmith");
// var concatCss = require('gulp-concat-css');
// var minifyCSS = require('gulp-minify-css');
// var renameCss = require('gulp-rename');
// var notify = require('gulp-notify');
// var prefix = require('gulp-autoprefixer');
// var livereload = require('gulp-livereload');
// var connect = require('gulp-connect');

// gulp.task('connect', function() {
//   connect.server({
//     root: '',
//     livereload: true
//   });
// });

// gulp.task('coffee', function(){
// 	gulp.src("coffee/*.coffee")
// 	.pipe(coffee())
//   .pipe(gulp.dest('js'))
// })

// gulp.task('css', function () {
//   gulp.src('css/*.css')
//     .pipe(concatCss("bundle.css"))
//     .pipe(prefix('last 15 versions'))
//     .pipe(minifyCSS())
//     .pipe(renameCss("bundle.min.css"))
//     .pipe(gulp.dest('app/css'))
//     .pipe(notify('Ok!'))
//     .pipe(connect.reload());
// });


gulp.task('sass', function () {
  gulp.src([
		'scss/*.scss'
  	])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 25 version'],
        cascade: false
      }))
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
	//gulp.watch('coffee/*.coffee', ['coffee']);
	gulp.watch([
		'scss/*.scss'
	], ['sass']);
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('img/ico/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('sprites/'));
});


//gulp.task('default', ['connect', 'html', 'css', 'watch']);
gulp.task('default', ['watch']);