<template>
  <v-app-bar app color="#4682B4" dark style="margin-left: 0%;">
    <!-- Logo or App Name -->
    <v-toolbar-title class="d-flex align-center">
      <span class="ml-5">{{ userName }}</span>
    </v-toolbar-title>

    <!-- Spacer to push items to the right -->
    <v-spacer></v-spacer>

    <!-- Additional Topbar Items (e.g., Notifications, User Menu) -->
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

const userName = ref("");
//const userId = ref(null);

// Inject the tenant value
const tenant = inject('tenant');



async function getUserData() {

  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('User is not authenticated. No access token found.');
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/accounts/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    if (!response.ok) {
      // Handle invalid or expired token
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch user data');
    }

    // Parse and return the user data
    const userData = await response.json();

    userName.value = userData.full_name
    tenant.value = userData.tenant;


    console.log(userData);
    // Update the provided tenant value

    console.log('Tenant set in TopBar:', tenant.value);
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}


async function logout() {
  try {
    // Make a POST request to the backend to log the user out (optional, as JWT is stateless)
    const response = await fetch('http://127.0.0.1:8000/api/accounts/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optionally, include the token in the Authorization header if needed
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Logout failed.');
    }

    // Clear the token from localStorage
    localStorage.removeItem('accessToken');

    // Redirect the user to the login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
    alert('Failed to log out. Please try again.');
  }
}

onMounted(() => {
  getUserData();
});
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
