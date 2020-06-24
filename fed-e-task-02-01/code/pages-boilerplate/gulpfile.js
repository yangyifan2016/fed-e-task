// 使用
// yarn clean : 清空dist temp目录
// yarn develop : 编译生成开发文件 (并行执行.scss文件的sass转换，.js文件的ES6语法转换，.html文件的模板替换操作，将编译后的文件生成在temp临时目录中)
// yarn clean : 编译生成生产文件 (首先清除dist temp目录中之前的编译文件，然后并行执行项目图片，字体文件)
const {src, dest, parallel, series, watch} = require('gulp')
const del = require('del')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const browserSync = require('browser-sync')
const bs = browserSync.create()

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass())
        .pipe(dest('temp'))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
}

const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig())
        .pipe(dest('temp'))
}

const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}

const clean = () => {
    return del(['dist', 'temp'])
}

const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)
    // watch('src/assets/image/**', image)
    // watch('src/assets/fonts/**', font)
    // watch('public/**', extra)
    watch(
        ['src/assets/image/**','src/assets/fonts/**','public/**'], 
        bs.reload
    )

    bs.init({
        notify: false,
        port: 2080,
        open: true,
        files: 'temp/**',
        server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

const useref = () => {
    return src('temp/*.html', { base: 'temp'})
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
    })))
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

const build = series(
    clean, 
    parallel( 
        series(compile, useref), 
        image, 
        font, 
        extra
    )
)

const develop = series(compile, serve)

module.exports = {
    clean,
    build,
    develop,
}