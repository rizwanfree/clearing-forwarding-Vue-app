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
import { ref, computed, watchEffect, provide } from 'vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';
import Login from './components/users/Login.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Use a ref to track the logged-in state
const userId = ref(localStorage.getItem('userId'));

// Make isLoggedIn reactive to changes in userId
const isLoggedIn = computed(() => {
  const loggedIn = !!userId.value; // This will return false for null, undefined, or empty string
  console.log('isLoggedIn:', loggedIn); // Debugging
  return loggedIn;
});

// Provide the isLoggedIn state to all child components
provide('isLoggedIn', isLoggedIn);

// Provide a function to update the userId
provide('updateUserId', (newUserId) => {
  userId.value = newUserId;
  localStorage.setItem('userId', newUserId || ''); // Store empty string if newUserId is null
  console.log('userId updated:', newUserId); // Debugging
});

</script>

<style>
/* Apply Poppins to the entire app */
body {
  font-family: 'Poppins', sans-serif;
}
</style>
