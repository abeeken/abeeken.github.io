var distName = "flat_default";

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
    'js/parts/globals.js',
    'js/parts/scripts.js'
];

gulp.task('clean', function () {
    return del('docs/**/*');
});

gulp.task('staticFiles', function(){
    return gulp.src(sourceFiles,{ base: '.' })
        .pipe(gulp.dest('docs'))
});

//gulp.task('makezip', function(){
//    return gulp.src('dist/'+distName+'/**/*')
//        .pipe(zip(distName+'.zip'))
//        .pipe(gulp.dest('dist'))
//});

gulp.task('sass', function(){
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./docs/css'))
});

gulp.task('minicss', function(){
    return gulp.src('docs/css/style.css')
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./docs/css'))
});

gulp.task('views', function(){
    return gulp.src('views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./docs'))
});

gulp.task('minijs', function(){
    return gulp.src(jsfiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./docs/js'))
        .pipe(jsnano())
        .pipe(gulp.dest('./docs/js'))
});

gulp.task('build', gulp.series('clean', 'sass', 'minicss', 'minijs', 'views', 'staticFiles'), function(){});

gulp.task('watch', function(){
    gulp.watch('sass/*.scss', gulp.series('sass','minicss'));
    gulp.watch('views/**/*.pug', gulp.series('views'));
    gulp.watch('js/parts/*.js', gulp.series('minijs'));
 });