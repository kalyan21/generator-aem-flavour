var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var bowerMain = require('main-bower-files');
var uglify = require('gulp-uglify');
var gulpFilter = require('gulp-filter');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-clean-css');
var less = require('gulp-less');
var gulpSequence = require('gulp-sequence');
var watch = require('gulp-watch');
var del = require('del');

var jsFilter = gulpFilter('**/*.js', { restore: true });
var lessFilter = gulpFilter('**/*.less', { restore: true });
var cssFilter = gulpFilter('**/*.css', { restore: true });

var appsDesignsPath = '../ui.apps/src/main/content/jcr_root/etc/designs/myapp';

gulp.task('default', function () {
    console.log("***********************Please use command > mvn package (or) gulp build to perform build*************************");
});

gulp.task('build', function (callback) {
    gulpSequence(
        'build-bower-vendor-clientlib',
        'build-app-clientlib',
        'clean:designs',
        'move-applibs-to-aem',
        'move-fonts-to-aem',
        'move-vendorlibs-to-aem')(callback)
});

gulp.task('prod-build', function (callback) {
    gulpSequence(
        'build-bower-vendor-clientlib',
        'build-app-clientlib-prod',
        'clean:designs',
        'move-applibs-to-aem',
        'move-fonts-to-aem',
        'move-vendorlibs-to-aem')(callback)
});

gulp.task('dev-build', function (callback) {
    gulpSequence(
        'build-app-clientlib',
        'move-applibs-to-aem')(callback)
});

gulp.task('clean:designs', function () {
    return del([
        appsDesignsPath + '/clientlib-all/css/**/*',
        appsDesignsPath + '/clientlib-all/js/**/*',
    ], { force: true });
});


gulp.task('build-app-clientlib', ['appStyles', 'appScripts'], function () {
    console.log("Finished tasks for application client libraries");
});

gulp.task('build-app-clientlib-prod', ['prod-appStyles', 'prod-appScripts'], function () {
    console.log("Finished tasks for production application client libraries");
});

gulp.task('watch', function () {
    gulp.watch('./aem_components/**', ['dev-build'])
});

gulp.task('build-bower-vendor-clientlib', ['fontawesome-fonts-to-dist', 'slick-fonts-to-dist'], function () {

    console.log(bowerMain());

    //JS
    return gulp.src(bowerMain())
        .pipe(jsFilter)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/vendor/js'))
        .pipe(jsFilter.restore)

        // LESS
        /* This task always uses LESS format of vendor js to build*/
        .pipe(lessFilter)
        .pipe(less())
        .pipe(concat('lib.css'))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/vendor/css'))
        .pipe(lessFilter.restore)

});

gulp.task('appStyles', function () {
    return gulp.src([
        './aem_components/**/styles/*.scss'
    ])
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./dist/app/css'));
});

gulp.task('appScripts', function () {
    return gulp.src([
        './aem_components/**/scripts/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/app/js'));
});

gulp.task('prod-appStyles', function () {
    return gulp.src([
        './aem_components/**/styles/*.scss'
    ])
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/app/css'));
});

gulp.task('prod-appScripts', function () {
    return gulp.src([
        './aem_components/**/scripts/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('./dist/app/js'));
});

gulp.task('move-vendorlibs-to-aem', function () {
    return gulp.src([
        './dist/vendor/**/*.*'
    ])
        .pipe(gulp.dest(appsDesignsPath + '/clientlib-vendor'));
});

gulp.task('move-applibs-to-aem', function () {
    return gulp.src([
        './dist/app/**/*.*'
    ])
        .pipe(gulp.dest(appsDesignsPath + '/clientlib-all'))
});

/*Fonts tasks*/
gulp.task('fontawesome-fonts-to-dist', function () {
    return gulp.src(['bower_components/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('dist/fonts/fontawesome'));
});

gulp.task('slick-fonts-to-dist', function () {
    return gulp.src(['bower_components/slick-carousel/slick/fonts/*'])
        .pipe(gulp.dest('dist/fonts/slick/css'));
});

gulp.task('move-fontawesome-fonts-to-aem', function () {
    return gulp.src([
        './dist/fonts/fontawesome/*.*'
    ])
        .pipe(gulp.dest(appsDesignsPath + '/clientlib-vendor/fonts/'))
});

gulp.task('move-slick-fonts-to-aem', function () {
    return gulp.src([
        './dist/fonts/slick/css/*'
    ])
        .pipe(gulp.dest(appsDesignsPath + '/clientlib-vendor/css/fonts/'))
});

gulp.task('move-fonts-to-aem', gulpSequence(['move-fontawesome-fonts-to-aem', 'move-slick-fonts-to-aem']));


