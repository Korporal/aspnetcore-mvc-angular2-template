const gulp = require('gulp'),
    del = require('del'),
    typescript = require('gulp-typescript'),
    tsconfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    less = require('gulp-less');

const base = {
    source:"app",
    build: "wwwroot",
    node:'node_modules'
}

const paths = {
    source: {
        css: base.source + '/**/*.less',
        js: base.source + '/**/*.ts',
        html: [base.source + '/**/*.html', '!' + base.source + '/index.html'],
        index: base.source+'/index.html'
    },
    build: {
        root: base.build,
        css: base.build + '/css',
        js: base.build,
        html: base.build + '/app',
        libs: base.build + '/libs'
    },
    libs: {
        angular:base.node + '/angular2',
        es6: base.node + '/es6-shim',
        system: base.node + '/systemjs',
        rxjs: base.node + '/rxjs',
    }
}


gulp.task("clean:js", function () { 
    del(paths.build.js);
});

gulp.task("clean:css", function () {
    del(paths.build.css);
});

gulp.task("clean", ["clean:js", "clean:css"]);

// setup vendors [angular]
// 

gulp.task("setup-libs", function () {

    gulp.src([
        paths.libs.angular + '/bundles/angular2.*.js',
        paths.libs.angular + '/bundles/angular2-polyfills.js',
        paths.libs.angular + '/bundles/http.*.js',
        paths.libs.angular + '/bundles/router.*.js',
        paths.libs.es6 + '/es6-shim.min.js',
        paths.libs.angular + '/es6/dev/src/testing/shims_for_IE.js',
        paths.libs.system + '/dist/*.*',
        paths.libs.rxjs + '/bundles/Rx.js'
    ])
    .pipe(gulp.dest(paths.build.libs));

});

gulp.task("transpile", function () {

    var result = gulp.src([

    ])
        .pipe(sourcemaps())
        .pipe(typescript(tsconfig));


    result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.libraries));

});


gulp.task('build', ['setup-libs', 'transpile']);

/*

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});
gulp.task("min", ["min:js", "min:css"]);

*/


