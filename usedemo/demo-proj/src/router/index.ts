import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/component/button',
      children: [
        {
          path: 'component/button',
          name: 'button',
          component: () => import('../views/component/ButtonDemo.vue')
        },
        {
          path: 'component/progress',
          name: 'progress',
          component: () => import('../views/component/ProgressDemo.vue')
        },
        {
          path: 'component/message',
          name: 'message',
          component: () => import('../views/component/MessageDemo.vue')
        }
      ]
    }
  ]
})

export default router
