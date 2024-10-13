import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import CreateProductView from '../views/CreateProductView.vue'
import LoginView from '../views/LoginView.vue';
import NotFound from '../components/NotFound.vue';
import EditProductView from '../views/EditProductView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/',
      redirect: '/products',
      meta: { requiresAuth: true },
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductView,
      meta: { requiresAuth: true },
    },

    {
      path: '/products/create',
      name: 'CreateProduct',
      component: CreateProductView,
      meta: { requiresAuth: true },
    },

    {
      path: '/products/:id/edit',
      name: 'EditProduct',
      component: EditProductView 
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFound,
    },

    {
      path: '/videos',
      name: 'videos',
      component: () => import('@/views/VideoView.vue'),
      meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authenticated
    next({ name: 'Login' }); // Redirect to the login page
  } else {
    next(); // Proceed to the route
  }
});

export default router
