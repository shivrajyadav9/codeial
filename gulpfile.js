import  pkg from 'gulp';
const { src, dest, series } = pkg;

import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
//const sass=require('gulp-sass')(require('sass'));

 import cssnano from 'gulp-cssnano';
//const cssnano=require('gulp-cssnano');
 import rev from 'gulp-rev';
//const rev=require('gulp-rev');

import gulpUglify from 'gulp-uglify-es';
const uglify = gulpUglify.default;
//const uglify=require('gulp-uglify-es').default;

import  imagemin from 'gulp-imagemin';
// const imagemin=require('gulp-imagemin');
 import * as del from 'del';
// const del=require('del');


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
    src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')//regex regular expression
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
function cleanAssets (done){
    del.deleteSync('./public/assets');
    done();
}

let build=series(cleanAssets,css,js);

export {build};
// exports.build=build;