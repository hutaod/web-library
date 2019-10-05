const { src, dest, watch } = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const cleanCss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')

const isDev = process.env.NODE_ENV === 'development'

function defaultTask() {
  if (isDev) {
    return src('components/**/*.scss')
      .pipe(sass())
      .pipe(concat('index.css'))
      .pipe(dest('dist/'))
  }
  return src('components/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(concat('index.min.css'))
    .pipe(cleanCss())
    .pipe(dest('dist/'))
}

if (isDev) {
  watch('components/**/*.scss', { ignoreInitial: false }, defaultTask)
}

exports.default = defaultTask
