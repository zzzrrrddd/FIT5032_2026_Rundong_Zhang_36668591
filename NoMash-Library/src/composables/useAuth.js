import { ref } from 'vue'

export const isAuthenticated = ref(false)
export const username = ref('')

const HARDCODED_USER = 'admin'
const HARDCODED_PASS = 'admin123'

export function useAuth() {
  const login = (user, pass) => {
    if (user === HARDCODED_USER && pass === HARDCODED_PASS) {
      isAuthenticated.value = true
      username.value = user
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    username.value = ''
  }

  return { isAuthenticated, username, login, logout }
}
