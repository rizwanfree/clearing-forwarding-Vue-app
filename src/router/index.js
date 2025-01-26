import { createRouter, createWebHistory } from 'vue-router';
import UserList from '@/components/users/UserList.vue';
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/users/Login.vue';

const routes = [
  // Redirect from '/' to '/dashboard'
  {
    path: '/',
    redirect: '/dashboard', // Redirect to /dashboard when accessing the root path
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }, // Protected route
  },
  {
    path: '/setups/users',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true }, // Protected route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('accessToken'); // Get the token from localStorage

    if (!token) {
      // If no token is found, redirect to the login page
      return next('/login');
    }

    // If token exists, allow navigation
    if (to.path === '/login') {
      next('/dashboard'); // Redirect authenticated users trying to access login
    } else {
      next(); // Allow navigation to the requested route
    }
  } else {
    next(); // If the route doesn't require authentication, proceed
  }
});

export default router;
