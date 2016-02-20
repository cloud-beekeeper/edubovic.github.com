'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    del = require('del');

gulp.task('server', ['sass', 'images'], function () {
    browserSync.init({
        server: "./public"
    });
    gulp.watch('./public/scss/**/*.scss', ['sass']);
    gulp.watch('./public/index.html').on('change', browserSync.reload);
});

gulp.task('images', function () {
    return gulp
        .src('./public/img/**/*.*')
        .pipe(gulp.dest('./public/build'))
    ;

});

gulp.task('sass', function () {
    return gulp
        .src('./public/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./public/build/css'))
        .pipe(browserSync.stream())
    ;
});


gulp.task('clean', function () {
    return del('./public/build');
});

gulp.task('default', ['clean', 'sass', 'server']);
