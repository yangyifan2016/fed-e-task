// 使用：
// yarn grunt : 转换src/assets中.js文件ES6特性，.scss文件sass语法，并开始监听文件变化，自动实时转换
// yarn grunt clean : 清除/dist目录中的转换文件
// yarn grunt sass : sass转换
// yarn grunt babel : ES6转换
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
    grunt.initConfig({
        clean: {
            temp: 'dist/**'
        },
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/css/main.css': 'src/assets/styles/*.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/js/app.js': 'src/assets/scripts/*.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/assets/scripts/*.js'],
                tasks: ['babel']
            },
            css: {
                files: ['src/assets/scripts/*.scss'],
                tasks: ['sass']
            }
        }
    })

    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)

    grunt.registerTask('default', ['sass', 'babel', 'watch'])
}