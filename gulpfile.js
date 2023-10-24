import gulp from 'gulp';
const { src, dest, series } = gulp;

import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)

import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';

import gulpUglify from 'gulp-uglify-es';
 const uglify = gulpUglify.default;
import terser from 'gulp-terser';

import imagemin from 'gulp-imagemin';
import * as del from 'del';


function css(done) {
    console.log('minifying css..');
    src('./assets/sass/**/*.scss')// ** means every sub folder inside it
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('./assets.css'))

    src('./assets/**/*.css')
        .pipe(rev())
        .pipe(dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(dest('./public/assets'));

    done();
};

function js(done) {
    console.log('minifying js..');
     src('./assets/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(dest('./public/assets'));
     done();
};

function images(done) {
    console.log('minifying images..');
        src('./assets/**/*')//regex regular expression .+(png|jpg|gif|svg|jpeg)
        .pipe(imagemin())
        .pipe(rev())
        .pipe(dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(dest('./public/assets'));
    done();
};


//empty the public assets directory
function cleanAssets(done) {
    del.deleteSync('./public/');
    done();
}

let build = series(cleanAssets, css, js);
export { build }
// exports.build=build;