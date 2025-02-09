/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

const gulp = require("gulp");
const gap = require("gulp-append-prepend");
const watch = require('gulp-watch');
const filter = require('gulp-filter');

gulp.task('resources-to-lib-watch', function () {
  const f = filter([
    '**',
    '!src/**/*.js',
    '!src/**/*.ts',
    '!src/**/*.tsx'
  ]);
  return watch('src/**/*', { ignoreInitial: false })
//      .pipe(gulp.dest('build'));
//    .src('./src/**/*.*')
    .pipe(f)
    .pipe(gulp.dest('./lib/'));
});

gulp.task("resources-to-lib", async function() {
  const f = filter([
    '**',
    '!src/**/*.js',
    '!src/**/*.ts',
    '!src/**/*.tsx'
  ]);
  gulp.src('./src/**/*.*')
    .pipe(f)
    .pipe(gulp.dest('./lib/'));
    return;
})

gulp.task("licenses", async function() {
  // this is to add Datalayer licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Datalayer - v0.3.0
=========================================================

* Product Page: https://datalayer.io
* Copyright 2020 Datalayer (https://datalayer.io)

* Coded by Datalayer

=========================================================

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Datalayer licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--

=========================================================
* Datalayer - v0.3.0
=========================================================

* Product Page: https://datalayer.io
* Copyright 2020 Datalayer (https://datalayer.io)

* Coded by Datalayer

=========================================================

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Datalayer licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

=========================================================
* Now UI Kit PRO React - v0.3.0
=========================================================

* Product Page: https://datalayer.io/product/now-ui-kit-pro-react
* Copyright 2020 Datalayer (https://datalayer.io)

* Coded by Datalayer

=========================================================

*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
