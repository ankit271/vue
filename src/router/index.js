import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import { getAuth } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Welcome,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',     
      component: () => import('../views/About.vue'),
    },
    {
      path: '/contact',
      name: 'contact',     
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/product',
      name: 'product',      
      children: [
        {
          path: 'create',
          component: () => import('../views/product/CreateProduct.vue'),
        },
        {
          path: 'listing',
          component: () => import('../views/product/ProductListing.vue'),
        },
      ],
    }
  ],
})

router.beforeEach((to, from, next) => {
    const auth = getAuth()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !auth.currentUser) {
        next('/login')
    } else {
        next()
    }
})

export default router
