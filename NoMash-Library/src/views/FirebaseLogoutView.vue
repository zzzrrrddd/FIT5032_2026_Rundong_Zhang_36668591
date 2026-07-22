<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const auth = getAuth()
const currentUser = ref(auth.currentUser)

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Firebase Logout Successful!')
      console.log('Current user after logout:', auth.currentUser)
      currentUser.value = null
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 offset-md-3 text-center">
        <h1>🚪 Firebase Logout</h1>

        <div v-if="currentUser" class="card mt-4">
          <div class="card-body">
            <p class="card-text">Currently logged in as:</p>
            <h5 class="card-title">{{ currentUser.email }}</h5>
            <button class="btn btn-danger mt-3" @click="logout">Logout</button>
          </div>
        </div>

        <div v-else class="alert alert-info mt-4">
          No user is currently logged in.
          <router-link to="/FireLogin" class="d-block mt-2">Go to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
