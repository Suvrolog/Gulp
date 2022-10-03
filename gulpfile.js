const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const gcmq = require("gulp-group-css-media-queries");
const pug = require("gulp-pug");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const gulpif = require("gulp-if");
const gulpStylelint = require("gulp-stylelint");

const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, JS_LIBS } = require("./gulp.config");

const copyImg = () => {
  return gulp
    .src(`${SRC_PATH}/assets/*`)
    .pipe(gulp.dest(`${DIST_PATH}/images`));
};

const clean = () => {
  return del(`${DIST_PATH}`);
};

const reload = (done) => {
  browserSync.reload();
  done();
};

const compilePug = () => {
  return gulp
    .src(`${SRC_PATH}/pages/*.pug`)
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(`${DIST_PATH}`));
};

const compileScss = () => {
  return gulp
    .src(`${SRC_PATH}/styles/main.scss`)
    .pipe(gulpif(env === "serve", sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      gulpif(
        env === "build",
        autoprefixer({
          cascade: true,
        })
      )
    )
    .pipe(gulpif(env === "build", gcmq()))
    .pipe(gulpif(env === "build", cleanCSS()))
    .pipe(gulpif(env === "serve", sourcemaps.write()))
    .pipe(gulp.dest(`./${DIST_PATH}/styles`))
    .pipe(gulpif(env === "serve", browserSync.stream()));
};

const lintScss = () => {
  return gulp.src(`${SRC_PATH}/**/*.scss`).pipe(
    gulpStylelint({
      reporters: [{ formatter: "string", console: true }],
    })
  );
};

const compileJs = () => {
  return gulp
    .src([...JS_LIBS, `${SRC_PATH}/js/*.js`])
    .pipe(gulpif(env === "serve", sourcemaps.init()))
    .pipe(concat("main.js"))
    .pipe(
      gulpif(
        env === "build",
        babel({
          presets: ["@babel/env"],
        })
      )
    )
    .pipe(gulpif(env === "serve", sourcemaps.write()))
    .pipe(gulp.dest(`./${DIST_PATH}/js`));
};

const moveFonts = () => {
  return gulp
    .src(`${SRC_PATH}/assets/fonts/*`)
    .pipe(gulp.dest(`./${DIST_PATH}/fonts`));
};

const moveGif = () => {
  return gulp
    .src(`${SRC_PATH}/assets/*.gif`)
    .pipe(gulp.dest(`./${DIST_PATH}/images`));
};

const watchers = (done) => {
  gulp.watch(`${SRC_PATH}/**/*.scss`, gulp.series(lintScss, compileScss));
  gulp.watch(`${SRC_PATH}/**/*.pug`, gulp.series(compilePug, reload));
  gulp.watch(`${SRC_PATH}/assets/*`, gulp.series(copyImg, reload));
  gulp.watch(`${SRC_PATH}/js/**/*.js`, gulp.series(compileJs, reload));
  done();
};

const server = (done) => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`,
    },
  });
  done();
};

exports.build = gulp.series(
  clean,
  gulp.parallel(
    compilePug,
    lintScss,
    compileScss,
    moveFonts,
    moveGif,
    compileJs,
    copyImg
  )
);

exports.serve = gulp.series(
  clean,
  gulp.parallel(
    compilePug,
    lintScss,
    compileScss,
    moveFonts,
    moveGif,
    compileJs,
    copyImg
  ),
  gulp.parallel(server, watchers)
);
