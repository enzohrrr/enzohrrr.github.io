const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

gulp.task('styles', () => {
    return gulp.src('assets/css/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({ rebase: false }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', () => {
    return gulp.src('assets/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('dist/js'));

});

gulp.task('default', gulp.parallel('styles', 'scripts'));
