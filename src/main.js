/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import router from './router'; // Import the router

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

 // Use the router
app.use(router);
registerPlugins(app)

app.mount('#app')
