import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Main from '@/components/main'
import Login from '@/components/login'

import NewsList from '@/components/news/list'
import NewsAdd from '@/components/news/add'
import NewsChart from '@/components/news/chart'
import Settings from '@/components/setting'

import NotFoundComponent from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Main,
      children: [
        {
          path: 'home',
          component: Home,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'newsList',
          component: NewsList,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/newsChart',
          component: NewsChart,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/newsAdd',
          component: NewsAdd,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/settings',
          component: Settings,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.admin === undefined) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
