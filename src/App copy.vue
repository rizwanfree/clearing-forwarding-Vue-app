<template>
  <v-app>

    <!-- Include the Sidebar Component -->
    <SideBar />
    <TopBar />
    <!-- Main Content -->
    <v-main>
      <router-view></router-view> <!-- Render the matched route component here -->
    </v-main>
  </v-app>
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
