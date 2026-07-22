import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDax-oZ0K6pqmQub8GTbmJ3PKXth4iV0Pc',
  authDomain: 'lab7-b55bd.firebaseapp.com',
  projectId: 'lab7-b55bd',
  storageBucket: 'lab7-b55bd.firebasestorage.app',
  messagingSenderId: '471231035160',
  appId: '1:471231035160:web:5c064a9828fa72a608106d'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')
