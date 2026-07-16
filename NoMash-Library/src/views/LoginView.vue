<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = ref({
  username: '',
  password: ''
})

const error = ref('')

const handleLogin = () => {
  if (login(form.value.username, form.value.password)) {
    router.push('/about')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="text-center">🔐 Login</h1>
        <p class="text-center">Enter your credentials to access the members area.</p>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="form.username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
