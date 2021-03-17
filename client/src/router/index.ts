import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: "Account",
    redirect: { name: 'Login' },
    component: () => import(/* webpackChunkName: "loginForm" */ '../pages/Account.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "loginForm" */ '../pages/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "RegisterForm" */ '../pages/Register.vue'),
      }
    ]
  },
  {
    path: "/",
    redirect: { name: 'Account' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
