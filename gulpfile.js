// Общее
var gulp                = require('gulp');
var plumber             = require('gulp-plumber');
var beeper              = require('beeper');
var gutil               = require('gulp-util');
var chalk               = require('chalk');
var clean               = require('gulp-clean');
var include             = require("gulp-include");
var concat              = require('gulp-concat');
var rename              = require('gulp-rename');
var cache               = require('gulp-cache');
var rmEL                = require('gulp-remove-empty-lines');
var zip                 = require('gulp-zip');
var del                 = require('del');

// Сервер
var browserSync         = require('browser-sync').create();
var reload              = browserSync.reload;
var ftp                 = require('vinyl-ftp');

// Стили
var stylus              = require('gulp-stylus');
var sourcemaps          = require('gulp-sourcemaps');
var postcss             = require('gulp-postcss');
var autoprefixer        = require('autoprefixer');
var sorting             = require('postcss-sorting');
var cssnano             = require('cssnano');
var cssbeautify         = require('gulp-cssbeautify');

// Разметка
var pug                 = require('gulp-pug');
var cached              = require('gulp-cached');
var changed             = require('gulp-changed');
var pugInheritance      = require('gulp-pug-inheritance');
var gulpif              = require('gulp-if');
var filter              = require('gulp-filter');
var posthtml            = require('gulp-posthtml');
var posthtmllorem       = require('posthtml-lorem');
var posthtmlAttrsSorter = require('posthtml-attrs-sorter');
var posthtmlAltAlways   = require('posthtml-alt-always');
var prettify            = require('gulp-html-prettify');
var htmlbeautify        = require('gulp-html-beautify');
var htmlnano            = require('gulp-htmlnano');

// Изображения
var imagemin            = require('gulp-imagemin');
var pngquant            = require('imagemin-pngquant');
var spritesmith         = require('gulp.spritesmith');

/* ========================= */
/*            FTP            */
/* ========================= */
  var pass = require('./pass.js');
  var FTP_USER_HOST = pass.host;
  var FTP_USER_NAME = pass.login;
  var FTP_USER_PASSWORD = pass.password;
  var FTP_PATH = '/deploy';

  gulp.task('deploy', function () {
    var conn = ftp.create({
      host:     FTP_USER_HOST,
      user:     FTP_USER_NAME,
      password: FTP_USER_PASSWORD,
      parallel: 10,
      log:      gutil.log
    });

    var globs = [
      'app/css',
      'app/images',
      'app/js',
      'app/*.*'
    ];

    return gulp.src( globs, { buffer: false } )
      .pipe( conn.dest( FTP_PATH ) );
  });


/* ========================= */
/*          СЕРВЕР           */
/* ========================= */
gulp.task('serve', function() {
  browserSync.init({
    server: './app',
    port: 8080,
    open: false,
    reloadOnRestart: false,
    notify: false
  });

  gulp.watch('dev/**/*.styl', ['styl']);
  gulp.watch('dev/**/*.pug', ['pug-watch']);
  gulp.watch('dev/modules/**/*.pug', ['pug-module']);
  gulp.watch('dev/modules/**/*.js', ['js:modules','js:compile','js:build']);
  gulp.watch('dev/components/**/*.js', ['js:modules','js:compile','js:build']);
  gulp.watch('dev/static/js/main.js', ['js:modules','js:compile','js:build']);
  gulp.watch('dev/static/js/**/*.js', ['js:plugins']);
  gulp.watch('dev/static/js/**/*.css', ['css:plugins']);
  gulp.watch('dev/static/fonts/**/*.*', ['fonts']);
  gulp.watch('dev/static/images/*.{jpg,gif,svg,png}', ['images']);
  gulp.watch('dev/static/images/**/*.{jpg,gif,svg,png}', ['images']);
});


/* ======================== */
/*           ОБЩЕЕ          */
/* ======================== */

  // Обработчик ошибок
  var plumberError = function (err) {
    beeper();
    gutil.log([(err.name + ' in ' + err.plugin), '', chalk.red(err.message), ''].join('\n'));
    this.emit('end');
  };

/* ======================== */
/*          ШАБЛОНЫ         */
/* ======================== */

  gulp.task('templates', function() {
      var YOUR_LOCALS = {
        "message": "This app is initialed"
      };
      return gulp.src(['dev/**/*.pug', '!dev/**/_*.pug', '!dev/**/m_*.pug', '!dev/components/**/*.pug'])
        .pipe(plumber({
          errorHandler: plumberError
        }))
        .pipe(changed('./app', {
          extension: '.html'
        }))
        .pipe(cached('pug'))
        .pipe(pugInheritance({
          basedir: './dev/templates',
          skip: 'node_modules'
        }))
        .pipe(pug({
          doctype: 'HTML',
          pretty: false,
          locals: YOUR_LOCALS
        }))
        .pipe(htmlnano({
          removeComments: false,
          removeEmptyAttributes: false
        }))
        .pipe(gulp.dest('./app/'))
        .pipe(reload({stream:true}));
  });

  gulp.task('pug-module', function buildHTML() {
    return gulp.src(['dev/templates/*.pug', '!dev/templates/_*.pug'])
      .pipe(plumber({
        errorHandler: plumberError
      }))
      .pipe(changed('src', {
          extension: '.html'
      }))
      .pipe(pug())
      .pipe(gulp.dest('./app'))
      .pipe(reload({stream: true}));
  });

  gulp.task('pug-watch', ['templates']);


/* ========================= */
/*          СТИЛИ            */
/* ========================= */

  gulp.task('styl', function() {
    return gulp.src('./dev/static/styl/app.styl')
      .pipe(plumber({
        errorHandler: plumberError
      }))
      .pipe(sourcemaps.init())
      .pipe(stylus({
        compress: false
      }))
      .pipe(postcss(
        [
          sorting(),
          autoprefixer()
        ]
      ))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./app/css'))
      .pipe(reload({stream: true}));
  });


/* ========================= */
/*          СКРИПТЫ          */
/* ========================= */

  gulp.task('js:modules', function() {
    return gulp.src(['dev/modules/**/*.js', 'dev/components/**/*.js'])
      .pipe(plumber({
        errorHandler: plumberError
      }))
      .pipe(include({
        hardFail: true,
        includePaths: [
          __dirname + "/",
          __dirname + "/node_modules",
          __dirname + "/dev/modules/",
          __dirname + "/dev/components/"
        ]
      }))
      .pipe(concat('modules.js', { newLine: '\n\n' }))
      .pipe(gulp.dest('tmp/js'));
  });

  gulp.task('js:compile', ['js:modules'], function() {
    return gulp.src("dev/static/js/main.js")
      .pipe(gulp.dest("tmp/js"));
  });

  gulp.task('js:build', ['js:compile'], function() {
    return gulp.src("tmp/js/main.js")
      .pipe(include({
        extensions: "js",
        hardFail: true,
        includePaths: [
          __dirname + "/tmp/js"
        ]
      }))
      .pipe(rename({basename:'app'}))
      .pipe(rmEL())
      .pipe(gulp.dest("app/js"))
      .pipe(reload({stream:true}));
  });


/* ========================= */
/*          ПЛАГИНЫ          */
/* ========================= */

  gulp.task('js:dependencies', function() {
    gulp.src(['dev/static/js/jquery-3.2.1.min.js', 'dev/static/js/modernizr.js'])
      .pipe(gulp.dest("app/js"));
  });


  gulp.task('js:plugins', function () {
    return gulp.src(["dev/static/js/**/*.js", "!dev/static/js/jquery-3.2.1.min.js", "!dev/static/js/modernizr.js", "!dev/static/js/main.js"])
      .pipe(plumber({
        errorHandler: plumberError
      }))
      .pipe(concat('vendor.js', { newLine: '\n\n' }))
      .pipe(gulp.dest("app/js"));
  });

  gulp.task('css:plugins', function () {
    return gulp.src("dev/static/js/**/*.css")
      .pipe(plumber({
        errorHandler: plumberError
      }))
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.css', { newLine: '\n\n' }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app/css'))
      .pipe(reload({stream:true}));
  });

  gulp.task('img:plugins', function () {
    return gulp.src(["dev/static/js/**/*.jpg", "dev/static/js/**/*.png", "dev/static/js/**/*.gif"])
      .pipe(gulp.dest('app/images'));
  });


/* ========================= */
/*        ИЗОБРАЖЕНИЯ        */
/* ========================= */

  gulp.task('images', function () {
    return gulp.src('dev/static/images/**/*')
      .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      })))
      .pipe(gulp.dest('app/images'));
  });

/* ========================= */
/*          ШРИФТЫ           */
/* ========================= */

  gulp.task('fonts', function () {
    return gulp.src('**/*.{eot,ttf,svg,woff}', {cwd: 'dev/static/fonts'})
      .pipe(gulp.dest('app/fonts'))
      .pipe(reload({stream:true}));
  });

/* ========================= */
/*          АРХИВ            */
/* ========================= */

  gulp.task('del-zip', function() {
    return del([
      'app.zip'
    ])
  });

  gulp.task('clean', function() {
    return del([
      'app',
      'tmp'
    ])
  });

  gulp.task('build-zip', ['del-zip'], function() {
    var zipName = 'app.zip';
    return gulp.src('app/**/*')
      .pipe(zip(zipName))
      .pipe(gulp.dest('./'));
  });
/* ========================= */
/*          СБОРКА           */
/* ========================= */

  gulp.task('build-clean', function() {
    return del([
      'build'
    ])
  });

  gulp.task('build-css', ['build-clean'], function() {
    return gulp.src('./dev/static/styl/app.styl')
      .pipe(stylus({ compress: false }))
      .pipe(postcss( [ sorting(), autoprefixer() ] ))
      .pipe(cssbeautify())
      .pipe(gulp.dest('./build/css'));
  });

  gulp.task('build-css-vendor', ['build-clean'], function () {
    return gulp.src("dev/static/js/**/*.css")
      .pipe(concat('vendor.css', { newLine: '\n\n' }))
      .pipe(gulp.dest('build/css'));
  });

  gulp.task('build-html', ['build-clean'], function() {
    gulp.src('./app/*.html')
      .pipe(htmlbeautify())
      .pipe(gulp.dest('./build/'))
  });
  gulp.task('build-js', ['build-clean'], function() {
    gulp.src('./app/js/*.js')
      .pipe(gulp.dest('./build/js/'))
  });
  gulp.task('build-img', ['build-clean'], function() {
    gulp.src(['./app/images/*', './app/images/**/*'])
      .pipe(gulp.dest('./build/images/'))
  });
  gulp.task('build-fonts', ['build-clean'], function() {
    gulp.src(['./app/fonts/*', './app/fonts/**/*'])
      .pipe(gulp.dest('./build/fonts/'))
  });


/* ========================= */
/*          ЗАДАЧИ           */
/* ========================= */

  gulp.task('dev',
    [
      'serve',
      'images',
      'fonts',
      'styl',
      'templates',
      'js:dependencies',
      'js:modules',
      'js:compile',
      'js:build',
      'js:plugins',
      'img:plugins',
      'css:plugins'
    ]
  );

  gulp.task('build', [
    'build-css',
    'build-css-vendor',
    'build-html',
    'build-js',
    'build-img',
    'build-fonts'
  ]);












