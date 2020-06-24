// 使用
// yarn clean : 清空dist temp目录
// yarn develop : 先编译生成开发运行文件 (并行执行.scss文件的sass转换，.js文件的ES6语法转换，.html文件的模板替换操作，将编译后的文件生成在temp临时目录中)
// 后开启对项目文件的监听，当html,css,js文件发生修改时，自动触发对应的文件处理，输出到/temp目录下，浏览器本地2080端口创建访问/temp目录下文件的服务，可实时查看项目改动后的运行效果
// image等静态文件发生变化时不进行压缩，但同样受到监听，触发浏览器窗口自动刷新操作
// yarn build : 编译生成生产文件 (首先清除dist temp目录中之前的编译文件，然后并行执行项目图片、字体文件的压缩，并将压缩后的文件与/public目录下无需压缩的文件一同输出到/dist目录下
// 同时对js,css,html文件先做编译转换处理，后做代码压缩处理，最终输出到/dist同结构目录下，完成生产模式下的项目文件代码处理)
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