let _Vue = null
export default class VueRouter {
    static install(Vue) {
        //1 判断当前插件是否被安装
        if (VueRouter.install.installed) {
            return
        }
        VueRouter.install.installed = true
        //2 把Vue的构造函数记录在全局
        _Vue = Vue
        //3 把创建Vue的实例传入的router对象注入到Vue实例
        _Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    _Vue.prototype.$router = this.$options.router
                }
            }
        })
    }
    constructor(options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current: '/'
        })
        this.init()
    }
    init() {
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    createRouteMap() {
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component
        })
    }
    initComponent(Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                }, [this.$slots.default])
            },
            methods: {
                clickHandler(e) {
                    location.hash = this.to;
                    // this.$router.data.current = this.to
                    e.preventDefault()
                }
            }
        })
        const that = this
        Vue.component('router-view', {
            render(h) {
                return h(that.routeMap[that.data.current])
            }
        })
    }
    initEvent() {
        window.addEventListener('hashchange', (e) => {
            this.data.current = window.location.hash.substr(1)
        })
    }
}
