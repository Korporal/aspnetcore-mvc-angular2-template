const gulp = require('gulp'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

var tsproject = typescript.createProject('tsconfig.json');

const base = {
    source:'.',
    build: 'wwwroot',
    node: 'node_modules',
    bower:'bower_modules'
}

const paths = {
    source: {
        bower: base.bower,

        app: base.source + '/app/**/*.ts',
        html: [base.source + '/**/*.html', '!' + base.source + '/index.html'],
        index: base.source+'/index.html'
    },
    build: {
        root: base.build,
        app: base.build + '/app',
        css: base.build + '/css',
        fonts: base.build + '/fonts',
        libs: base.build + '/libs'
    },
    libs: {
        base:base.node,
        angular:base.node + '/angular2',
        es6: base.node + '/es6-shim',
        system: base.node + '/systemjs',
        rxjs: base.node + '/rxjs',
        reactive: base.node + '/@reactivex',
    }
}

/* CLEANUP */
gulp.task('clean-app', function () { 
    del(paths.build.js);
});
gulp.task('clean-css', function () {
    del(paths.build.css + '/**.*' );
});
gulp.task('clean-fonts', function () {
    del(paths.build.fonts + '/**.*');
});
gulp.task('clean-libs', function () {
    del(paths.build.libs + '/**/*');
});

gulp.task('clean', ['clean-app', 'clean-css', 'clean-fonts']);

/* ASSETS */
gulp.task('setup-css', function () {

    gulp.src([
            paths.source.bower + '/bootstrap/dist/css/**/*.css',
            paths.source.bower + '/font-awesome/css/**/*.css'
        ])
        .pipe(gulp.dest(paths.build.css));

});

gulp.task('setup-fonts', function () {
    gulp.src([
            paths.source.bower + '/bootstrap/dist/fonts/**/*.*',
            paths.source.bower + '/font-awesome/fonts/**/*.*',
        ])
        .pipe(gulp.dest(paths.build.fonts));
});

gulp.task('assets', ['setup-css', 'setup-fonts']);


// DEPENDENCIES [angular]

gulp.task('setup-angular', function () {

    gulp.src([
            paths.libs.angular + '/bundles/angular2.*.js',
            paths.libs.angular + '/bundles/angular2-polyfills.js',
            paths.libs.angular + '/bundles/http.*.js',
            paths.libs.angular + '/bundles/router.*.js',
            paths.libs.angular + '/platform/browser.js',
            paths.libs.es6 + '/es6-shim.min.js',
            paths.libs.angular + '/es6/dev/src/testing/shims_for_IE.js',
            paths.libs.system + '/dist/*.*',
            paths.libs.base + 'rxjs/**',
            paths.libs.rxjs + '/bundles/Rx.js',

        ])
        .pipe(gulp.dest(paths.build.libs));
});


gulp.task('setup-reactive', function () {
    
    gulp.src([
           paths.libs.reactive + '/rxjs/dist/amd/**/*.js'
    ])
        .pipe(gulp.dest(paths.build.libs + '/rxjs'));
});

gulp.task('setup-libs',['setup-angular', 'setup-reactive'])


gulp.task('transpile', function () {

    var result = gulp.src([
            paths.libs.angular + '/bundles/typings/angular2/angular2.d.ts',
            paths.libs.angular + '/bundles/typings/angular2/http.d.ts',
            paths.libs.angular + '/bundles/typings/angular2/router.d.ts',
            paths.libs.base + 'typescript-compiler/lib/lib.es6.d.ts',
            'node_modules/@reactivex/rxjs/dist/es6/Rx.d.ts',
            'app/**/*.ts'
        ])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsproject));

    result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.app));
});


gulp.task('build', ['setup-libs', 'transpile']);

    /*
    
    gulp.task('min:js', function () {
        return gulp.src([paths.js, '!' + paths.minJs], { base: '.' })
            .pipe(concat(paths.concatJsDest))
            .pipe(uglify())
            .pipe(gulp.dest('.'));
    });
    
    gulp.task('min:css', function () {
        return gulp.src([paths.css, '!' + paths.minCss])
            .pipe(concat(paths.concatCssDest))
            .pipe(cssmin())
            .pipe(gulp.dest('.'));
    });
    gulp.task('min', ['min:js', 'min:css']);
    
    */


