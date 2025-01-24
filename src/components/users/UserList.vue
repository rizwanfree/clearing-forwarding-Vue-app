<template>
  <v-container>
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td hidden>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <v-chip class="text-center" :color="user.role === 'admin' ? 'primary' : 'success'" small>
                  {{ user.role }}
                </v-chip>
              </td>
              <td>{{ formatDate(user.createdAt) }}</td>
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
    <v-dialog v-model="isAddUserModalOpen" max-width="600">
      <v-card>
        <v-card-title class="text-center">Add New User</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitAddUserForm">
            <v-text-field v-model="newUser.name" label="Name" required outlined class="mb-3"></v-text-field>

            <v-text-field v-model="newUser.email" label="Email" type="email" required outlined
              class="mb-3"></v-text-field>

            <v-text-field v-model="newUser.password" label="Password" type="password" required outlined
              class="mb-3"></v-text-field>

            <v-select v-model="newUser.role" :items="roles" label="Role" outlined class="mb-3"></v-select>

            <v-btn type="submit" color="primary" :loading="isSubmitting">
              Add User
            </v-btn>
            <v-btn @click="closeAddUserModal" class="ml-2">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Edit User Modal -->
    <v-dialog v-model="isEditUserModalOpen" max-width="600">
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

            <v-btn type="submit" color="primary" :loading="isSubmitting">
              Save Changes
            </v-btn>
            <v-btn @click="closeEditUserModal" class="ml-2">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [], // Array to store the list of users
      isAddUserModalOpen: false, // Controls the visibility of the add user modal
      isEditUserModalOpen: false, // Controls the visibility of the edit user modal
      newUser: {
        name: '',
        email: '',
        password: '',
        role: 'user',
      }, // Object to store new user data
      editUserData: {
        id: null,
        name: '',
        email: '',
        password: '',
        role: 'user',
      }, // Object to store user data for editing
      roles: ['user', 'admin'], // Available roles
      isSubmitting: false, // Loading state for the form submission
    };
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
  methods: {
    // Fetch users from the API
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3002/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    // Format the date for display
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },

    // Open the add user modal
    openAddUserModal() {
      this.isAddUserModalOpen = true;
    },

    // Close the add user modal
    closeAddUserModal() {
      this.isAddUserModalOpen = false;
      this.resetNewUserForm();
    },

    // Reset the new user form
    resetNewUserForm() {
      this.newUser = {
        name: '',
        email: '',
        password: '',
        role: 'user',
      };
    },

    // Submit the add user form
    async submitAddUserForm() {
      this.isSubmitting = true;
      try {
        const response = await fetch('http://localhost:3002/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...this.newUser,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        this.closeAddUserModal();
        this.fetchUsers(); // Refresh the user list after adding a new user
      } catch (error) {
        console.error('Error adding user:', error);
      } finally {
        this.isSubmitting = false;
      }
    },

    // Open the edit user modal
    openEditUserModal(user) {
      this.editUserData = { ...user }; // Copy user data to editUserData
      this.isEditUserModalOpen = true;
    },

    // Close the edit user modal
    closeEditUserModal() {
      this.isEditUserModalOpen = false;
      this.resetEditUserForm();
    },

    // Reset the edit user form
    resetEditUserForm() {
      this.editUserData = {
        id: null,
        name: '',
        email: '',
        password: '',
        role: 'user',
      };
    },

    // Submit the edit user form
    async submitEditUserForm() {
      this.isSubmitting = true;
      try {
        const response = await fetch(`http://localhost:3002/users/${this.editUserData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...this.editUserData,
            updatedAt: new Date().toISOString(),
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        this.closeEditUserModal();
        this.fetchUsers(); // Refresh the user list after updating the user
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        this.isSubmitting = false;
      }
    },

    // Delete a user
    async deleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          const response = await fetch(`http://localhost:3002/users/${userId}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          this.fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    },
  },
};
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
