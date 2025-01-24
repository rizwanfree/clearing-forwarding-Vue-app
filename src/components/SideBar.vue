<template>
  <v-navigation-drawer permanent app style="background-color: #4682B4;">

    <div class="logo-section">
      <img src="https://cdn.vuetifyjs.com/docs/images/brand-kit/v-logo-circle.png" alt="Logo" class="logo" />
    </div>

    <v-list density="compact" nav>
      <!-- Dashboard -->
      <v-list-item link to="/dashboard">
        <template v-slot:prepend>
          <v-icon icon="mdi-view-dashboard" color="white"></v-icon>
        </template>
        <v-list-item-title class="menu-item">Dashboard</v-list-item-title>
      </v-list-item>

      <!-- Setups -->
      <v-list-group value="Setups">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <v-icon icon="mdi-cog" color="white"></v-icon>
            </template>
            <v-list-item-title class="menu-item">Setups</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item link to="/setups/users">
          <v-list-item-title class="submenu-item">Users</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 2</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Clients -->
      <v-list-group value="Clients">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <v-icon icon="mdi-account-group" color="white"></v-icon>
            </template>
            <v-list-item-title class="menu-item">Clients</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 2</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Activities -->
      <v-list-group value="Activities">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <v-icon icon="mdi-calendar-check" color="white"></v-icon>
            </template>
            <v-list-item-title class="menu-item">Activities</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 2</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <!-- Billing -->
      <v-list-group value="Billing">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <v-icon icon="mdi-credit-card" color="white"></v-icon>
            </template>
            <v-list-item-title class="menu-item">Billing</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 1</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="submenu-item">Option 2</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideBar',
};
</script>

<style scoped>
/* Ensure the sidebar takes full height */
.v-navigation-drawer {
  height: 100vh !important;
}

/* Custom font sizes */
:deep(.menu-item) {
  font-size: 1.0rem !important;
  /* 20px */
  font-weight: 400 !important;
  /* Semi-Bold */
  color: white !important;
  /* White text */
  font-family: 'Poppins', sans-serif !important;
  /* Apply Poppins font */
}

:deep(.submenu-item) {
  font-size: .9rem !important;
  /* 16px */
  font-weight: 500 !important;
  /* Medium */
  color: white !important;
  /* White text */
  font-family: 'Poppins', sans-serif !important;
  /* Apply Poppins font */
}

/* Hover effect for menu items */
:deep(.v-list-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
  /* Light white overlay on hover */
  transition: background-color 0.3s ease !important;
  /* Smooth transition */
}

/* Logo Section */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  /* Add some padding */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  /* Optional: Add a separator line */
}

.logo {
  width: 50%;
  /* Make the logo cover the full width of the sidebar */
  max-width: 50%;
  /* Ensure it doesn't exceed the sidebar width */
  height: auto;
  /* Maintain aspect ratio */
}
</style>
