// Load dependencies
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sourceMaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');

// Live CSS Reload & Browser Syncing
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ""
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});


// Compressing images & handle SVG files
gulp.task('images', function(tmp) {
    gulp.src(['images/*.jpg', 'images/*.png'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('images'));
});

// Compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['js/**/*.js'])
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber())
        //this is the filename of the compressed version of our JS
        .pipe(concat('scripts.min.js'))
        //compress :D
        .pipe(uglify())
        //catch errors
        .on('error', gutil.log)
        //where we will store our finalized, compressed script
        .pipe(gulp.dest('js'))
        //notify browserSync to refresh
        .pipe(browserSync.reload({
            stream: true
        }));
});


// Compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('styles/scss/init.scss')
        //prevent pipe breaking caused by errors from gulp plugins
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        //get sourceMaps ready
        .pipe(sourceMaps.init())
        //include SCSS and list every "include" folder
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                'styles/scss/'
            ]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
            cascade: true
        }))
        //catch errors
        .on('error', gutil.log)
        //the final filename of our combined css file
        .pipe(concat('styles.css'))
        //get our sources via sourceMaps
        .pipe(sourceMaps.write())
        //where to save our final, compressed css file
        .pipe(cleanCSS())
        .pipe(gulp.dest('styles'))
        //notify browserSync to refresh
        .pipe(browserSync.reload({
            stream: true
        }));
});


//basically just keeping an eye on all HTML files
gulp.task('html', function() {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('*.html')
        .pipe(plumber())
        .pipe(browserSync.reload({
            stream: true
        }))
        //catch errors
        .on('error', gutil.log);
});


//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  startup the web server,
//  start up browserSync
//  compress all scripts and SCSS files
gulp.task('default', ['browserSync', 'scripts', 'styles'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('js/src/**', ['scripts']);
    gulp.watch('styles/scss/**', ['styles']);
    gulp.watch('images/**', ['images']);
    gulp.watch('*.html', ['html']);
});
