import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: "Account",
    redirect: { name: 'Login' },
    component: () => import(/* webpackChunkName: "Account" */ '../pages/Account.vue'),
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
    component: () => import(/* webpackChunkName: "BrowseRooms" */ '../pages/BrowseRooms.vue'),
  },
  {
    path: '/games/:id',
    name: 'Room',
    component: () => import(/* webpackChunkName: "Room" */ '../pages/Room.vue'),
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'Account' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
