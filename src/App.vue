<template>
  <!-- Layout will only be displayed if the user is logged in -->
  <v-layout v-if="isLoggedIn" class="rounded rounded-md">
    <SideBar />
    <TopBar />
    <v-main class="d-flex align-center justify-center">
      <router-view></router-view> <!-- Render the matched route component here -->
    </v-main>
  </v-layout>
  <!-- Login page will show if user is not logged in -->
  <Login v-else />
</template>

<script setup>
import { ref, computed, provide } from 'vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';
import Login from './components/users/Login.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Use a ref to track the JWT token
const accessToken = ref(localStorage.getItem('accessToken'));

// Make isLoggedIn reactive to changes in accessToken
const isLoggedIn = computed(() => {
  const loggedIn = !!accessToken.value; // This will return false for null, undefined, or empty string
  console.log('isLoggedIn:', loggedIn); // Debugging
  return loggedIn;
});

// Provide the isLoggedIn state to all child components
provide('isLoggedIn', isLoggedIn);

// Provide a function to update the accessToken
provide('updateToken', (newToken) => {
  accessToken.value = newToken;
  localStorage.setItem('accessToken', newToken || ''); // Store empty string if newToken is null
  console.log('accessToken updated:', newToken); // Debugging
});

// Provide a function to clear the token (logout)
provide('logout', () => {
  accessToken.value = null;
  localStorage.removeItem('accessToken');
  console.log('User logged out'); // Debugging
  router.push('/'); // Redirect to the login page
});

</script>

<style>
/* Apply Poppins to the entire app */
body {
  font-family: 'Poppins', sans-serif;
}
</style>
