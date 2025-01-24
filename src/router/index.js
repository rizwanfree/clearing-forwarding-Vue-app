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
  const userId = localStorage.getItem('userId');
  console.log(`Navigating from ${from.path} to ${to.path}. userId: ${userId}`); // Debugging

  if (to.meta.requiresAuth && !userId) {
    next('/login'); // Redirect to login if not authenticated
  }
  else if (to.meta.requiresAuth && userId === null){
    next('/login'); // Redirect to login if not authenticated
  }
  else {
    next(); // Proceed to the route
  }
});

export default router;
