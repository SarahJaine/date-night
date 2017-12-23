import gulp from 'gulp'
import del from 'del'
import sourcemaps from 'gulp-sourcemaps'
import suitcss from 'gulp-suitcss'
import stylelintConfig from '../stylelint.config'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'

export const EXTRAS_GLOB = './datenight/static_src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2,mp3,mp4,ogv,ogg,webm}'

gulp.task('clean', () => del('./datenight/static/'))

gulp.task('webpack', () =>
  webpackStream(require('../webpack.config.js'), webpack)
  .pipe(gulp.dest('./datenight/static/js/')))

gulp.task('css', () =>
  gulp.src('./datenight/static_src/css/app.css')
    .pipe(sourcemaps.init())
    .pipe(suitcss({
      stylelint: stylelintConfig,
      use: ['postcss-nested']
    }))
    .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./datenight/static/css/'))
)

gulp.task('extras', () =>
  gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('./datenight/static/')))
