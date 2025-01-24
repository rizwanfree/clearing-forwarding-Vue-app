<template>
  <v-app-bar app color="#4682B4" dark style="margin-left: 0%;">
    <!-- Logo or App Name -->
    <v-toolbar-title class="d-flex align-center">
      <span class="ml-5">M.R.Shipping Agency Pvt Ltd</span>
    </v-toolbar-title>

    <!-- Spacer to push items to the right -->
    <v-spacer></v-spacer>

    <!-- Additional Topbar Items (e.g., Notifications, User Menu) -->
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TopBar',
};
</script>

<style scoped>
/* Logo Styling */
.logo {
  width: 40px;
  /* Adjust the size of the logo */
  height: auto;
  /* Maintain aspect ratio */
}

/* Customize the toolbar title font */
.v-toolbar-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.25rem;
  /* Adjust the font size */
  font-weight: 500;
  /* Semi-Bold */
}
</style>
