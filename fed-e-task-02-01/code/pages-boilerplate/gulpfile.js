// 实现这个项目的构建任务
const {src, dest} = require('gulp')

exports.default = () => {
    return src('src/*.scss')
    .pipe(dest('dist'))
}