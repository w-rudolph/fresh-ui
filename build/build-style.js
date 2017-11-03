const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function() {
    gulp.src('../src/packages/sass/index.scss')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('fresh-ui.css'))
        .pipe(gulp.dest('../dist/styles'));
});

gulp.task('fonts', function() {
    gulp.src('../src/packages/sass/ionicons/fonts/*.*')
        .pipe(gulp.dest('../dist/styles/ionicons/fonts'));
});

gulp.task('default', ['css', 'fonts']);