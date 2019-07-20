const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', async () => console.log('Gulp is running...'));

// Copy All HTML Files
gulp.task('copyHtml', async () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Optimize Images
gulp.task('imageMin', async () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// Minify JS
gulp.task('minify', async () => {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass
gulp.task('sass', async () => {
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', async () => {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch
gulp.task('watch', async () => {
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});

gulp.task('default', gulp.series(
    'message',
    'copyHtml',
    'imageMin',
    'sass',
    'scripts'
));
