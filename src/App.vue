<template>
  <v-layout class="rounded rounded-md">
    <SideBar />

    <TopBar />

    <v-main class="d-flex align-center justify-center">
      <router-view></router-view> <!-- Render the matched route component here -->
    </v-main>
  </v-layout>
</template>


<script setup>
import SideBar from './components/SideBar.vue';
import TopBar from './components/TopBar.vue';
</script>

<style>
/* Apply Poppins to the entire app */
body {
  font-family: 'Poppins', sans-serif;
}
</style>
