import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequesterView from '../views/requester/RequesterView.vue'
import ValidatorView from '../views/validator/ValidatorView.vue'
import LoginView from '../views/login/LoginView.vue'
import { useUserStore } from '@/stores/user'  // import your Pinia store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/requester',
      name: 'requester',
      component: RequesterView,
      meta: { requiresAuth: true }, // protected route
    },
    {
      path: '/validator',
      name: 'validator',
      component: ValidatorView,
      meta: { requiresAuth: true }, // protected route
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach((to) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.user) {
    return { name: 'login' }
  }

  if (to.name === 'login' && userStore.user) {
    return { name: 'home' }
  }
})

export default router
