<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="4" class="d-flex justify-center">
        <v-card class="pa-4" style="max-width: 400px; width: 100%;">
          <v-card-title class="text-h6">Login Page</v-card-title>
          <v-card-text>
            <form @submit.prevent="login">
              <v-text-field v-model="username" label="Username" name="username" outlined required></v-text-field>
              <v-text-field v-model="password" label="Password" name="password" type="password" outlined
                required></v-text-field>

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

const username = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);
const router = useRouter();

// Inject the updateToken function from App.vue
const updateToken = inject('updateToken');

async function login() {
  if (!username.value || !password.value) {
    error.value = 'Please fill in both fields.';
    return;
  }

  isLoading.value = true;
  error.value = '';

  try {
    const response = await fetch('http://localhost:8000/api/accounts/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Invalid credentials');
    }

    const { access } = await response.json();
    console.log('Login successful. Token:', access);

    // Update the token using the provided function
    updateToken(access);

    // Navigate to the dashboard
    await router.push('/dashboard');
  } catch (err) {
    console.error('Error during login:', err);
    error.value = err.message;
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
