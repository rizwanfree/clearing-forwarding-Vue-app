import { createRouter, createWebHistory } from 'vue-router';
import UserList from '@/components/users/UserList.vue'; // Import your components
import Dashboard from '@/components/Dashboard.vue';


const routes = [
  {
    path: '/', // Dashboard route
    name: 'Dashboard',
    component: Dashboard, // Replace with your actual home component
  },
  {
    path: '/setups/users', // User List route
    name: 'UserList',
    component: UserList,
  },
  // {
  //   path: '/about', // About route
  //   name: 'About',
  //   component: About, // Replace with your actual about component
  // },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(), // Use HTML5 history mode
  routes, // Pass the routes array
});

export default router;
