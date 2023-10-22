import pkg from 'gulp';
const {src,dest,series} = pkg;

import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';

function css() {
    console.log('minifying css..');
    src('./assets/sass/**/*.scss')// ** means every sub folder inside it
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('./assets.css'))

    return src('./assets/**/*.css')
        .pipe(rev())
        .pipe(dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(dest('./public/assets'));
};

export default series(css)