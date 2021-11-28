import { createRouter, createWebHashHistory } from 'vue-router'
import HeroesList from '../views/HeroesList.vue'
import HeroDetail from '../views/HeroDetail.vue'

const routes = [
  {
    path: '/',
    name: 'HeroesList',
    component: HeroesList
  },
  {
    path: '/hero/:id',
    name: 'HeroDetail',
    component: HeroDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
