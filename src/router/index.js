import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import CreateProductView from '../views/CreateProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      redirect: '/products'
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductView
    },

    {
      path: '/products/create',
      name: 'CreateProduct',
      component: CreateProductView
    },

    {
      path: '/videos',
      name: 'videos',
      component: () => import('@/views/VideoView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
