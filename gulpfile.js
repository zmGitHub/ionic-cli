var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    shell = require('gulp-shell');

gulp.task('lint', function() {
    return gulp.src(['lib/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', shell.task(['npm run test']));
