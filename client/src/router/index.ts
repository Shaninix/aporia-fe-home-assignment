// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PokemonPage from "../views/PokemonPage.vue"

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonPage',
    component: PokemonPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
