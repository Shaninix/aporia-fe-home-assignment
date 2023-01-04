/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { store, key } from './store'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.use(store, key)

app.mount('#app')


