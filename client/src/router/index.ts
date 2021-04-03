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
    path: '/games',
    name: "Game",
    component: () => import(/* webpackChunkName: "gameCenter" */ '../pages/GameCenter.vue'),
  },
  {
    path: '/games/:id',
    name: 'Room',
    component: () => import(/* webpackChunkName: "chooseGame" */ '../pages/ChooseGame.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
