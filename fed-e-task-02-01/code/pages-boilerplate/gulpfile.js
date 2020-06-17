// 实现这个项目的构建任务
const {src, dest, parallel, series} = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const swig = require('gulp-swig')

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(sass())
        .pipe(dest('dist'))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('dist'))
}

const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(swig())
        .pipe(dest('dist'))
}

const compile = parallel(style, script, page)

module.exports = {
    compile
}