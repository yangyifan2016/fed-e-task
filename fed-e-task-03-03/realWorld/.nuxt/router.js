import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0bc7b99c = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _8a82b05e = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _c562ca92 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _5d399977 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _498cb3d6 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _000e4042 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _4403dcc4 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _0bc7b99c,
    children: [{
      path: "",
      component: _8a82b05e,
      name: "home"
    }, {
      path: "/login",
      component: _c562ca92,
      name: "login"
    }, {
      path: "/register",
      component: _c562ca92,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _5d399977,
      name: "profile"
    }, {
      path: "/settings",
      component: _498cb3d6,
      name: "settings"
    }, {
      path: "/editor",
      component: _000e4042,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _4403dcc4,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
