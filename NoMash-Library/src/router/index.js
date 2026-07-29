import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import DeniedView from '../views/DeniedView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseLogoutView from '../views/FirebaseLogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
import { isAuthenticated } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/denied',
    name: 'Denied',
    component: DeniedView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/FireLogout',
    name: 'FireLogout',
    component: FirebaseLogoutView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/WeatherCheck',
    name: 'weatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
