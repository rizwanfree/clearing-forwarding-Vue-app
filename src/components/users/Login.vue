<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="4" class="d-flex justify-center">
        <v-card class="pa-4" style="max-width: 400px; width: 100%;">
          <v-card-title class="text-h6">Login Page</v-card-title>
          <v-card-text>
            <form @submit.prevent="login">
              <v-text-field v-model="username" label="Username" outlined required></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" outlined required></v-text-field>

              <v-btn type="submit" color="primary" block class="mt-4" :disabled="isLoading">
                <span v-if="isLoading">Logging In...</span>
                <span v-else>Login</span>
              </v-btn>
            </form>
          </v-card-text>
          <v-card-actions>
            <p v-if="error" style="color: red; font-weight: bold;">{{ error }}</p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const router = useRouter();

// Inject the isLoggedIn state and updateUserId function
const isLoggedIn = inject('isLoggedIn');
const updateUserId = inject('updateUserId');

async function login() {
  if (!username.value || !password.value) {
    error.value = "Please fill in both fields.";
    return;
  }

  isLoading.value = true;
  error.value = "";

  // Split the username into admin, license, and NTN
  const res = username.value.split('-');
  const uname = res[0]; // e.g., "admin"
  const licenseNtn = res[1].split('@');
  const license = licenseNtn[0]; // e.g., "1509"
  const ntn = licenseNtn[1]; // e.g., "1045149"

  try {
    // Step 1: Validate the license and NTN in the agents table
    const agentResponse = await fetch(
      `http://localhost:3002/agents?license=${license}&ntn=${ntn}`
    );
    if (!agentResponse.ok) {
      throw new Error(`HTTP ERROR! Status: ${agentResponse.status}`);
    }

    const agentData = await agentResponse.json();
    console.log('Agent Data:', agentData);

    if (agentData.length === 0) {
      error.value = 'Invalid company details (License or NTN mismatch).';
      return;
    }

    const agent = agentData[0];

    // Step 2: Validate the user within the specified company
    const userResponse = await fetch(
      `http://localhost:3002/users?name=${uname}&password=${password.value}&tenantId=${agent.id}`
    );
    if (!userResponse.ok) {
      throw new Error(`HTTP ERROR! Status: ${userResponse.status}`);
    }

    const userData = await userResponse.json();
    console.log('User Data:', userData);

    if (userData.length > 0) {
      // Update the userId using the provided function
      updateUserId(userData[0].id);
      console.log('Login Successful. Redirecting to dashboard...');

      // Navigate to dashboard
      await router.push('/dashboard');
    } else {
      error.value = 'User not found in the specified company.';
    }
  } catch (err) {
    console.error('Error during login:', err);
    error.value = 'An unexpected error occurred during login.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.v-container {
  background-color: #f5f5f5;
}

.v-btn[disabled] {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
