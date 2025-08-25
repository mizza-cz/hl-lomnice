const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const config = require('./config');

const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const parcel = require('gulp-parcel');
const fileinclude = require('gulp-file-include');
const rename = require('gulp-rename');
const uglify = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cleanCSS = require('gulp-clean-css');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');

/**
 * SERVER TASKS
 */
const livePreview = (done) => {
    browserSync.init({
        server: {
            baseDir: config.paths.app.base,
        },
        port: config.config.port,
    });
    done();
};

const previewReload = (done) => {
    browserSync.reload();
    done();
};

/**
 * DEV TASKS
 */
const devHTML = (done) => {
    src(`${config.paths.src.base}/*.html`)
        .pipe(fileinclude(), {
            prefix: '@@',
            basepath: '@file',
        })
        .pipe(dest(config.paths.app.base));
    done();
};

const devStyles = () => {
    const tailwindcss = require('tailwindcss');
    return src(`${config.paths.src.css}/*.css`)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([postcssImport({ root: `${config.paths.src.css}/ *` }), tailwindcss(config.config.tailwindjs), require('autoprefixer')]))
        .pipe(concat({ path: 'style.css' }))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(dest(config.paths.app.css));
};

const devScripts = (done) => {
    // JS with imports
    src(`${config.paths.src.js}/*.parcel.js`, { since: lastRun(devScripts), read: false, minify: true })
        .pipe(parcel({ sourceMaps: false }))
        .pipe(
            rename((path) => {
                path.basename = path.basename.replace('.parcel', '');
                path.extname = '.js';
            })
        )
        .pipe(dest(config.paths.app.js));
    // Basic JS
    src([`${config.paths.src.js}/*.js`, `!${config.paths.src.js}/*.parcel.js`])
        .pipe(
            uglify({
                output: {
                    comments: false,
                },
            })
        )
        .pipe(dest(config.paths.app.js));
    done();
};

const devSvgSymbols = () => {
    return src(`${config.paths.src.img}/icon/*.svg`)
        .pipe(
            svgmin((file) => {
                const prefix = path.basename(file.relative, path.extname(file.relative));
                return {
                    plugins: [
                        {
                            removeAttrs: {
                                attrs: 'fill',
                            },
                            removeViewBox: false,
                            cleanupIDs: {
                                prefix: prefix + '-',
                                minify: true,
                            },
                        },
                    ],
                };
            })
        )
        .pipe(svgstore())
        .pipe(dest(`${config.paths.app.img}`));
};

const devSvg = (done) => {
    src(`${config.paths.src.img}/content/*.svg`).pipe(svgmin()).pipe(dest(config.paths.app.img));
    done();
};

const devImages = (done) => {
    const pngQuality = [0.7, 0.7];
    const jpgQuality = 70;
    const plugins = [pngquant({ quality: pngQuality })];

    src(config.paths.src.img + '/content/*.+(png|jpg|jpeg)')
        .pipe(imagemin([...plugins]))
        .pipe(dest(config.paths.app.img));
    src(`${config.paths.src.img}/content/*.+(webp)`).pipe(dest(config.paths.app.img));
    done();
};

const devFont = () => src(`${config.paths.src.font}/*`).pipe(dest(config.paths.app.font));
const devFavicon = () => src(`${config.paths.src.favicon}/*`).pipe(dest(config.paths.app.favicon));
const devJson = () => src(`${config.paths.src.base}/*.json`).pipe(dest(`${config.paths.app.base}`));
const devClean = () => del([config.paths.app.base]);

/**
 * PROD TASKS
 */
const prodHTML = () => src(`${config.paths.app.base}/*.html`).pipe(dest(config.paths.build.base));
const prodScripts = () => src(`${config.paths.app.js}/*.js`).pipe(dest(config.paths.build.js));
const prodImages = () => src(`${config.paths.app.img}/**/*`).pipe(dest(config.paths.build.img));
const buildFinish = (done) => done();
const prodFont = () => src(`${config.paths.app.font}/*`).pipe(dest(config.paths.build.font));
const prodFavicon = () => src(`${config.paths.app.favicon}/*`).pipe(dest(config.paths.build.favicon));
const prodJson = () => src(`${config.paths.app.base}/*.json`).pipe(dest(`${config.paths.build.base}`));
const prodClean = () => del([config.paths.build.base]);

const prodStyles = () => {
    return src(`${config.paths.app.css}/**/*`)
        .pipe(cleanCSS({ level: 0 }))
        .pipe(dest(config.paths.build.css));
};

// Watchdog
const watchFiles = (done) => {
    watch(`${config.paths.src.base}/**/*.html`, series(devHTML, devStyles, previewReload));
    watch([config.config.tailwindjs, `${config.paths.src.css}/**/*.css`], series(devStyles, previewReload));
    watch(`${config.paths.src.js}/**/*.js`, series(devScripts, previewReload));
    watch(`${config.paths.src.img}/content/*.+(png|jpg|jpeg|webp)`, series(devImages, previewReload));
    watch(`${config.paths.src.img}/content/*.svg`, series(devSvg, previewReload));
    watch(`${config.paths.src.img}/icon/*.svg`, series(devSvgSymbols, previewReload));
    watch(`${config.paths.src.favicon}/*`, series(devFavicon, previewReload));
    watch(`${config.paths.src.font}/*.+(ttf|woff|woff2)`, series(devFont, previewReload));
    done();
};

exports.default = series(
    devClean,
    parallel(devStyles, devScripts, devImages, devHTML, devSvg, devSvgSymbols, devFavicon, devFont, devJson),
    livePreview,
    watchFiles
);
exports.prod = series(prodClean, parallel(prodStyles, prodScripts, prodImages, prodHTML, prodFavicon, prodFont, prodJson), buildFinish);
