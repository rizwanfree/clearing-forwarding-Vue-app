<template>
  <div>
    <!-- Render layout only if the route is not the login page -->
    <v-layout v-if="!isLoginPage" class="rounded rounded-md">
      <SideBar />
      <TopBar />

      <br>

      <v-main class="d-flex align-center justify-center">
        <router-view></router-view>
      </v-main>
    </v-layout>

    <!-- Render only the router view for login page -->
    <router-view v-else />
  </div>

</template>

<script setup>
import { ref, computed, provide } from 'vue';
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';
import { useRoute } from 'vue-router';

//const router = useRouter();

const route = useRoute();


// Create a reactive tenant value
const tenant = ref(null);
// Provide the tenant value to all child components
provide('tenant', tenant);



// Computed property to check if the current page is the login page
const isLoginPage = computed(() => route.path === '/login');

</script>

<style>
/* Apply Poppins to the entire app */
body {
  font-family: 'Poppins', sans-serif;
}
</style>
