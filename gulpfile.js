var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    argv   = require('minimist')(process.argv),
    gulpif = require('gulp-if'),
    prompt = require('gulp-prompt'),
    concat = require('gulp-concat'),
    rsync  = require('gulp-rsync'),
    package = require('./package.json');


var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write('../css'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('scripts.min.js'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write('../js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "dist"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});


/*******************************************************************************
 * Description:
 *
 *   Gulp task to push changes to remote servers (eg: staging/dev/production)
 *
 * Usage:
 *
 *   gulp deploy --target
 *
 * Examples:
 *
 *   gulp deploy --production   // push to production
 *   gulp deploy --dev          // push to dev
 *   gulp deploy --staging      // push to staging
 *
 ******************************************************************************/

gulp.task('deploy', function() {

  // Dirs and Files to sync
  rsyncPaths = ['dist/assets'];

  // Default options for rsync
  // More rsync options here: https://gist.github.com/brianyuen/d3c4c91b74ce4e458e70884ad4cdc486
  rsyncConf = {
    progress: true,
    incremental: true,
    relative: true,
    emptyDirectories: true,
    recursive: true,
    clean: true,
    exclude: ['.DS_Store', '.Trashes'],
  };

  // Staging
  if (argv.staging) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go

  // Dev
  } else if (argv.dev) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go

  // Production
  } else if (argv.production) {

    rsyncConf.hostname = ''; // hostname
    rsyncConf.username = ''; // ssh username
    rsyncConf.destination = ''; // path where uploaded files go


  // Missing/Invalid Target
  } else {
    throwError('deploy', gutil.colors.red('Missing or invalid target'));
  }


  // Use gulp-rsync to sync the files
  return gulp.src(rsyncPaths)
  .pipe(gulpif(
      argv.production,
      prompt.confirm({
        message: 'Heads Up! Are you SURE you want to push to PRODUCTION?',
        default: false
      })
  ))
  .pipe(rsync(rsyncConf));

});

// The following is a generic function to handle error messages
function throwError(taskName, msg) {
  throw new gutil.PluginError({
      plugin: taskName,
      message: msg
    });
}

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("dist/*.html", ['bs-reload']);
});
