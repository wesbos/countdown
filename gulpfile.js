var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var size = require('gulp-filesize');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var reload = browserSync.reload;

gulp.task('sass', function(){
	return gulp.src('style/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers : ['last 2 versions'],
			cascade : false
		}))
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('style/'))
		.pipe(size());
});

gulp.task('scripts', function(){
	return gulp.src('script/production/*.js')
		.pipe(babel())
		.pipe(concat('master.js'))
		.pipe(uglify())
		.pipe(rename('master.min.js'))
		.pipe(gulp.dest('script/'))
		.pipe(size());
});

gulp.task('imagemin', function(){
	return gulp.src('images/original/*.+{png|jpg|jpeg|gif|svg}')
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}]
		})))
		.pipe(gulp.dest('images/optimized/'))
		.pipe(size());
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('*.html').on('change', reload);
	gulp.watch('style/scss/*.scss', ['sass']).on('change', reload);
	gulp.watch('script/production/*.js', ['scripts']).on('change', reload);
	gulp.watch('images/original/*', ['imagemin']).on('change', reload);
});

gulp.task('default', ['browserSync', 'sass', 'scripts', 'watch']);