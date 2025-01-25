import { createRouter, createWebHistory } from 'vue-router';
import UserList from '@/components/users/UserList.vue';
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/users/Login.vue';

const routes = [
    {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
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
  // Check if the access token exists in localStorage
  const accessToken = localStorage.getItem('accessToken');

  console.log(`Navigating from ${from.path} to ${to.path}. accessToken: ${accessToken}`); // Debugging

  if (to.meta.requiresAuth && !accessToken) {
    next('/login'); // Redirect to login if not authenticated
  } else if (to.name === 'Login' && accessToken) {
    next('/'); // Redirect to dashboard if already logged in
  } else {
    next(); // Proceed to the route
  }
});

export default router;
