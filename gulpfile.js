
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babel = require('babelify');


function compile(watch) {
    var bundler = watchify(browserify('./src/main.jsx', { debug: true }).transform(babel, {extensions: [".babel", ".jsx"], presets: ["react"]}));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('./build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'))
            .pipe(notify({ message: 'scripts task complete' }));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('scripts', function() { return compile(); });
gulp.task('scripts_watch', function() { return watch(); });


// Styles
gulp.task('styles', function() {
    return sass('styles/main.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('build/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('build/'))
        .pipe(notify({ message: 'Styles task complete' }));
});


// Watch
gulp.task('watch', function() {

    gulp.start('styles');

    // Watch .scss files
    gulp.watch('styles/**/*.scss', ['styles']);

    gulp.start('scripts_watch');

});

gulp.task('default', function(){
    gulp.start('styles');
    gulp.start('scripts');
});