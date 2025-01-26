<template>
  <v-container class="w-5 mx-auto" style="width: 2000px;">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="">User List</span>
        <div>
          <v-btn color="success" @click="openAddUserModal">Add User</v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-table>
          <thead style="font-weight: bolder;">
            <tr>
              <th hidden>ID</th>
              <th class="font-weight-bold">Username</th>
              <th class="font-weight-bold">Name</th>
              <th class="font-weight-bold">Email</th>
              <th class="font-weight-bold">Role</th>
              <th class="font-weight-bold">Created At</th>
              <th class="font-weight-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td hidden>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.full_name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <v-chip class="text-center" :color="user.role === 'admin' ? 'primary' : 'success'" small>
                  {{ user.role }}
                </v-chip>
              </td>
              <td>{{ formatDate(user.created_at) }}</td>
              <td style="text-align: center;">
                <v-btn icon @click="openEditUserModal(user)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn class="mx-3" icon @click="deleteUser(user.id)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Add User Modal -->
    <v-dialog v-model="isAddUserModalOpen" style="width: 1000px;">
      <v-card>
        <v-card-title class="text-center">Add New User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitAddUserForm">

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="newUser.name" label="Name" required outlined class="mb-3">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="newUser.email" label="Email" type="email" required outlined class="mb-3">
                </v-text-field>
              </v-col>
            </v-row>


            <v-row class="mb-4">
              <v-col cols="12" md="6">
                <v-text-field v-model="newUser.name" label="Username" required outlined class="mb-3" disabled>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="newUser.password" label="Password" type="password" required outlined
                  class="mb-3">
                </v-text-field>
              </v-col>
            </v-row>

            <v-select v-model="newUser.role" :items="roles" label="Role" outlined class="mb-3"></v-select>

            <v-row class="justify-center">
              <v-col cols="12" md="6" class="d-flex justify-space-between">
                <v-btn type="submit" color="primary" class="py-3 px-6" :loading="isSubmitting"
                  style="width: 45%; height: 50px; font-size: large;">
                  Add User
                </v-btn>
                <v-btn @click="closeAddUserModal" class="py-3 px-6" outlined color="secondary"
                  style="width: 45%; height: 50px; font-size: large;">
                  Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Edit User Modal -->
    <v-dialog v-model="isEditUserModalOpen" max-width="500">
      <v-card>
        <v-card-title class="text-center">Edit User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitEditUserForm">
            <v-text-field v-model="editUserData.name" label="Name" required outlined class="mb-3"></v-text-field>

            <v-text-field v-model="editUserData.email" label="Email" type="email" required outlined
              class="mb-3"></v-text-field>

            <v-text-field v-model="editUserData.password" label="Password" type="password" required outlined
              class="mb-3"></v-text-field>

            <v-select v-model="editUserData.role" :items="roles" label="Role" outlined class="mb-3"></v-select>
            <div class="flex justify-center">
              <v-btn type="submit" color="primary" :loading="isSubmitting">Save</v-btn>
              <v-btn @click="closeEditUserModal" class="ml-2">Cancel</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref, inject, watch } from 'vue';

const users = ref([]);
const agent = ref(null);
const isAddUserModalOpen = ref(false);
const isEditUserModalOpen = ref(false);
const isSubmitting = ref(false);

const tenant = inject('tenant');

// Watch for changes to tenant.value
watch(tenant, (newTenant) => {
  if (newTenant) {
    console.log("Tenant updated in UserList:", newTenant);
    fetchUsers(); // Fetch users when tenant is set
  }
});

//console.log("Tenant is: " + tenant.value);

// Fetch users when the component is mounted (if tenant is already set)
onMounted(() => {
  if (tenant.value) {
    fetchUsers();
  }
});

const newUser = ref({
  name: '',
  email: '',
  password: '',
  role: 'user',
});

const editUserData = ref({
  id: null,
  name: '',
  email: '',
  password: '',
  role: 'user',
});

const roles = ['user', 'admin'];

// Fetch users from the API
async function fetchUsers() {
  if (!tenant.value) {
    console.error('Tenant is not set. Cannot fetch users.');
    return;
  }
  try {
    const response = await fetch(`http://localhost:8000/api/accounts/user-list/?tenant=${tenant.value}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    users.value = await response.json(); // Use .value
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Format the date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Open the add user modal
function openAddUserModal() {
  isAddUserModalOpen.value = true; // Use .value
}

// Close the add user modal
function closeAddUserModal() {
  isAddUserModalOpen.value = false; // Use .value
  resetNewUserForm();
}

// Reset the new user form
function resetNewUserForm() {
  newUser.value = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  };
}

// Submit the add user form
async function submitAddUserForm() {
  isSubmitting.value = true; // Use .value
  try {
    const response = await fetch('http://localhost:3002/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newUser.value, // Use .value
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    closeAddUserModal();
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    isSubmitting.value = false; // Use .value
  }
}

// Open the edit user modal
function openEditUserModal(user) {
  editUserData.value = { ...user }; // Use .value
  isEditUserModalOpen.value = true; // Use .value
}

// Close the edit user modal
function closeEditUserModal() {
  isEditUserModalOpen.value = false; // Use .value
  resetEditUserForm();
}

// Reset the edit user form
function resetEditUserForm() {
  editUserData.value = {
    id: null,
    name: '',
    email: '',
    password: '',
    role: 'user',
  };
}

// Submit the edit user form
async function submitEditUserForm() {
  isSubmitting.value = true; // Use .value
  try {
    const response = await fetch(`http://localhost:3002/users/${editUserData.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...editUserData.value, // Use .value
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    closeEditUserModal();
    fetchUsers(); // Refresh the user list
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    isSubmitting.value = false; // Use .value
  }
}

// Delete a user
async function deleteUser(userId) {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      const response = await fetch(`http://localhost:3002/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}


</script>

<style scoped>
/* Add custom styles if needed */
table th {
  font-weight: bolder;
  font-size: 1.05rem;
}

.v-chip {
  margin: 0;
}
</style>
