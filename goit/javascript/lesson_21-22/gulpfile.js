var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    babel = require('gulp-babel');

gulp.task('tests', function () {
    gulp.src('./spec/*.js')
        .pipe(jasmine())
});

gulp.task('babel', function () {
    return gulp.src('./public/js/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/build/js'));
});
