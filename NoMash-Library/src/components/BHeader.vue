<script setup>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

const { isAuthenticated, username, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active"
            >Firebase Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active"
            >Firebase Register</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/FireLogout" class="nav-link" active-class="active"
            >Firebase Logout</router-link
          >
        </li>
      </ul>

      <div class="d-flex align-items-center">
        <template v-if="isAuthenticated">
          <span class="me-3">👋 {{ username }}</span>
          <button class="btn btn-outline-danger btn-sm" @click="handleLogout">Logout</button>
        </template>
        <router-link v-else to="/login" class="btn btn-primary btn-sm">Login</router-link>
      </div>
    </header>
  </div>
</template>
