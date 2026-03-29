import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/HelloWorld.vue'

const routes = [
  {
    path: '/board/:boardId',
    component: Home
  },
  {
    path: '/boards',
    component: () => import('../components/boards.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router