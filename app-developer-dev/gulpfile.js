var releaseDest = '../app-developer/'; // 发布目录

var gulp = require('gulp'), // 基础库
    babel = require('gulp-babel'), // babel，用于转换es6后缀文件
    concat = require('gulp-concat'), // 文件合并
    autoprefixer = require('gulp-autoprefixer'), // 自动添加hack
    less = require('gulp-less'), // less文件处理
    importCss = require('gulp-import-css'), // css文件导入
    minifyCss = require('gulp-minify-css'), // css文件压缩
    minifyImg = require('gulp-imagemin'), // img文件压缩
    uglify = require('gulp-uglify'), // js压缩
    clean = require('gulp-clean'), // 清空文件夹
    replace = require('gulp-replace'), // 字符替换
    webpack = require('gulp-webpack'), // webpack
    named = require('vinyl-named'), // 配合webpack的命名插件
    rev = require('gulp-rev'), // 更改版本名
    revCollector = require('gulp-rev-collector'), // 更新静态资源引用路径
    sourcemaps = require('gulp-sourcemaps'), // sourcemaps插件
    plumber = require('gulp-plumber'), // gulp错误检测
    runSequence = require('gulp-run-sequence'); // 按队列执行任务

// es6文件转换
gulp.task('es6', function() {
    return gulp.src('src/**/*.es6').
    pipe(plumber({
        errorHandler: function(e) {
            console.log(e);
        }
    })).
    pipe(babel({
        presets: ['es2015'],
        plugins: ['transform-react-jsx']
    })).
    pipe(gulp.dest('src/'));
});

// js文件打包
gulp.task('packJs', function() {
    return gulp.src('src/apps/**/index.js').
    pipe(named(function(file) {
        // console.log(file.path);
        return file.path.replace(/^.*(?:\\|\/)(.+)(?:\\|\/)index.js$/, '$1/index');
    })).
    pipe(webpack({
        // watch: true,
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=react&presets[]=es2015'
            }],
        },
    })).
    pipe(gulp.dest('static/apps/'));
});

// less文件处理
gulp.task('packLess', function() {
    return gulp.src('src/**/*.less').
    pipe(plumber({
        errorHandler: function(e) {
            console.log(e);
        }
    })).
    pipe(less()).
    pipe(importCss()). // 处理 @import url
        //pipe(autoprefixer('last 2 Chrome versions', 'Firefox > 20')).
    pipe(autoprefixer('Chrome > 20', 'Firefox > 20')).
    pipe(gulp.dest('static/'));
});

// css文件打包
gulp.task('packCss', function() {
    return gulp.src('src/**/*.css').
    pipe(importCss()). // 处理 @import url
        //pipe(autoprefixer('last 2 Chrome versions', 'Firefox > 20')).
    pipe(autoprefixer('Chrome > 20', 'Firefox > 20')).
    pipe(gulp.dest('static/'));
});

// 清空目标文件夹
gulp.task('clean', function() {
    return gulp.src([releaseDest + '**/*.*'], {
        read: false
    }).
    pipe(clean({
        force: true
    }));
});

// 移动静态资源
gulp.task('moveRes', function() {
    return gulp.src(['static/**/*.*', '!**/*.{js,css,png,jpg,gif,ico,md}']).
    pipe(gulp.dest(releaseDest + 'static/'));
});

// 移动并优化图片文件
gulp.task('moveImg', function() {
    return gulp.src('static/**/*.{png,jpg,gif,ico}').
    pipe(minifyImg({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    })).
    pipe(gulp.dest(releaseDest + 'static/'));
});

// 移动并压缩js文件
gulp.task('moveJs', function() {
    return gulp.src('static/**/*.js').
        // pipe(sourcemaps.init()).
    pipe(replace(/\/\*debug>[\s\S]*<debug\*\//g, '')). // 清除debug标记
    pipe(uglify()).
        // pipe(sourcemaps.write('../../maps', {
        //     includeContent: false, sourceRoot: '../static/js',
        //     sourceMappingURL: function(file){
        //         return 'http://127.0.0.1/app-h5-dev/maps/' + file.relative + '.map';
        //     }
        // })).
    pipe(gulp.dest(releaseDest + 'static/'));
});

// 移动并压缩css文件
gulp.task('moveCss', function() {
    return gulp.src('static/**/*.css').
    pipe(minifyCss()).
    pipe(gulp.dest(releaseDest + 'static/'));
});

// 打版本号并生成rev-manifest.json文件
gulp.task('rev', function() {
    return gulp.src('static/**/*.*').
    pipe(rev()).
        // pipe(gulp.dest(dest.res)).  // 目前只需计算文件摘要，不进行重命名
    pipe(rev.manifest()).
    pipe(gulp.dest('rev/'));
});

// 修改html和css文件，给静态文件打戳
gulp.task('stamp', function() {
    gulp.src(['rev/*.json', releaseDest + 'static/**/*.css']).
    pipe(revCollector({
            replaceReved: true
        })).
        // 修改为 ?v=stamp 形式
    pipe(replace(/\-([0-9a-z]{8,})\.(png|jpg|gif|ico)/g, function(a, b, c) {
        return '.' + c + '?v=' + b;
    })).
    pipe(gulp.dest(releaseDest + 'static/'));
    gulp.src(['rev/*.json', 'page/**/*.html']).
    pipe(revCollector({
            replaceReved: true
        })).
        // 修改为 ?v=stamp 形式
    pipe(replace(/\-([0-9a-z]{8,})\.(css|(min\.)?js)/g, function(a, b, c) {
        return '.' + c + '?v=' + b;
    })).
    pipe(gulp.dest(releaseDest + 'page/'));
});

// 把src文件夹移动到发布目录
// gulp.task('moveSrc', function(){
//     return gulp.src('./src/**/*').pipe(gulp.dest(releaseDest + 'src/'));
// });

// 用于watch6任务
gulp.task('packES6', function(def) {
    return runSequence('es6', 'packJs', def);
});

// 监控文件，自动处理（es6版）
gulp.task('watch6', function() {
    gulp.watch('src/**/*.es6', ['packES6']);
    gulp.watch('src/**/*.{less,css}', ['packLess', 'packCss']);
});

// 监控文件，自动处理（es5版）
gulp.task('watch5', function() {
    gulp.watch('src/**/*.{js,jsx}', ['packJs']);
    gulp.watch('src/**/*.{less,css}', ['packLess', 'packCss']);
});

// 发布
gulp.task('release', function(def) {
    return runSequence('es6', 'packJs', 'packLess', 'packCss', 'moveRes', 'moveImg', 'moveJs', 'moveCss', 'rev', 'stamp', def);
});

// 默认任务
gulp.task('default', ['watch6']);