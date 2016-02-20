var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

gulp.task('concat', function() {
    return gulp.src('./js/**/*.js')
        .pipe(concat('all.gulp.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('uglify', function() {
    return gulp.src('./build/all.gulp.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
    gulp.watch('./js/**/*.js', function(event) {
        gulp.run(['concat', 'uglify']);
    });
});


