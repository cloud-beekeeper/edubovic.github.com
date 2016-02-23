var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    minifyCss = require('gulp-minify-css');

gulp.task('js', function () {
    return gulp.src('./public/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('all.gulp.js'))
        .pipe(gulp.dest('./build/js'))

});

gulp.task('css', function () {
    return gulp.src('./public/css/**/*.css')
        .pipe(minifyCss())
        .pipe(concat('all.gulp.css'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('clean:dist', function() {
    return del.sync('./build');
});

gulp.task('watch', ['build'], function (){
    gulp.watch('./public/css/**/*.css', ['css']);
    gulp.watch('./public/js/**/*.js', ['js']);
});


gulp.task('build', ['clean:dist', 'css', 'js'], function () {
    console.log('Building files');
});
