var distName = "abeeken.github.io";

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var jsnano = require('gulp-minify');
var zip = require('gulp-zip');

var sourceFiles = [
    'img/*.*'
];

var jsfiles = [
    'js/parts/getGithubFolder.js'
];

gulp.task('clean', function () {
    return del('docs/**/*');
});

//gulp.task('staticFiles', function(){
//  return gulp.src(sourceFiles,{ base: '.' })
//        .pipe(gulp.dest('docs'))
//});

//gulp.task('makezip', function(){
//    return gulp.src('dist/'+distName+'/**/*')
//        .pipe(zip(distName+'.zip'))
//        .pipe(gulp.dest('dist'))
//});

gulp.task('sass', function(){
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
});

gulp.task('minicss', function(){
    return gulp.src('css/style.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
});

gulp.task('views', function(){
    return gulp.src('views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('.'))
});

gulp.task('minijs', function(){
    return gulp.src(jsfiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js'))
        .pipe(jsnano())
        .pipe(gulp.dest('./js'))
});

gulp.task('build', gulp.series('sass', 'minicss', 'minijs', 'views'), function(){});

gulp.task('watch', function(){
    gulp.watch('sass/*.scss', gulp.series('sass','minicss'));
    gulp.watch('views/**/*.pug', gulp.series('views'));
    gulp.watch('js/parts/*.js', gulp.series('minijs'));
 });