/*
*  说明此构建文件只适用于本项目
*   
*/

var releaseDest = '../app-h5-zip/'; // 发布目录

var gulp = require('gulp'),                         // 基础库
    watch = require('gulp-watch'),                  // watch库，解决新增文件不能监听的bug
    watchPath = require('gulp-watch-path'),         // 用于解析watch结果的库
    browserSync = require('browser-sync'),          // 用于自动刷新页面
    babel = require('gulp-babel'),                  // babel，用于转换es6后缀文件
    concat = require('gulp-concat'),                // 文件合并
    autoprefixer = require('gulp-autoprefixer'),    // 自动添加hack
    less = require('gulp-less'),                    // less文件处理
    // sass = require('gulp-sass'),                    // sass文件处理
    importCss = require('gulp-import-css'),         // css文件导入
    minifyCss = require('gulp-clean-css'),          // css文件压缩
    minifyImg = require('gulp-imagemin'),           // img文件压缩
    uglify = require('gulp-uglify'),                // js压缩
    del = require('del'),                           // 删除文件或目录
    replace = require('gulp-replace'),              // 字符替换
    webpack = require('webpack-stream'),            // webpack
    named = require('vinyl-named'),                 // 配合webpack的命名插件
    rev = require('gulp-rev'),                      // 更改版本名
    revCollector = require('gulp-rev-collector'),   // 更新静态资源引用路径
    sourcemaps = require('gulp-sourcemaps'),        // sourcemaps插件
    zip = require('gulp-zip'),                      // zip压缩插件
    tar = require('gulp-tar'),                      // tar打包插件
    gzip = require('gulp-gzip'),                    // gzip压缩插件
    plumber = require('gulp-plumber');              // gulp错误检测


/*
* 打包js
*/
function PackJs(src, dist) {
    var src = src;
    var dist = dist;
    return gulp.src(src).
    pipe(plumber({errorHandler: function(e){
        console.log(e);
    }})).
    pipe(named()).
    pipe(webpack({
        module: {
            loaders: [
                {test: /\.js|jsx|es6$/, exclude: /node_modules/, loader: 'babel?presets[]=react&presets[]=es2015'}
            ],
        },
    })).
    // pipe(uglify()).
    pipe(gulp.dest(dist));
}


/*
* 打包css
*/
function PackCss(src, dist) {
    return gulp.src(src).
        pipe(plumber({errorHandler: function(e){
            console.log(e);
        }})).
        pipe(importCss()). // 处理 @import url
        // pipe(autoprefixer('last 2 Chrome versions', 'Firefox > 20')).
        pipe(autoprefixer('Chrome > 10', 'Firefox > 10')).
        pipe(gulp.dest(dist));
}


/*
* 打包less
*/
function PackLess(src, dist) {
    var src = src, dist = dist;
    console.log('less building...');
    return gulp.src(src).
        pipe(plumber({errorHandler: function(e){
            console.log(e);
        }})).
        pipe(less()).
        pipe(importCss()).
        pipe(minifyCss()). // 处理 @import url
        // pipe(autoprefixer('last 2 Chrome versions', 'Firefox > 20')).
        pipe(gulp.dest(dist));
}


//移动html
function removeIndex() {
    return gulp.src('./index.html').
    pipe(gulp.dest('../factory/'))
}
function removeHtml() {
    return gulp.src('./pages/**').
    pipe(gulp.dest('../factory/page/'))
}

//移动css
function removeCss() {
    return gulp.src('./static/css/**').
    pipe(gulp.dest('../factory/static/css/'))
}

//移动img
function removeImg() {
    return gulp.src('./static/img/**').
    pipe(gulp.dest('../factory/static/img/'))
}

//移动js
function removeJs() {
    return gulp.src('./static/js/**').
    pipe(gulp.dest('../factory/static/js/'))
}

//移动libs里的静态资源
function removeLibs() {
    return gulp.src('./libs/**').
    pipe(gulp.dest('../factory/libs/'))
}




/*
* 执行打包js和css
*/
gulp.task('pack',function(){
    PackJs('./src/app/index.es6', './static/js');
    PackLess('./src/app/css/style.less', './static/css');
    PackCss('./src/app/css/style.css', './static/css');
})


/*
* 执行预发布移动文件
*/
gulp.task('release',function(){
    removeHtml();
    removeCss();
    removeJs();
    removeImg();
    removeLibs();
    removeIndex();
})

/*
* 监控源文件js和css
*/

gulp.task('watch', function() {
    gulp.watch(['./src/app/*.es6', './src/modules/**/*.es6'], ['pack']);
    gulp.watch('src/app/css/*.{less,css}', ['pack']);
});

//默认任务
gulp.task('default', ['pack', 'watch']);