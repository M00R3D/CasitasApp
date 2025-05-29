// src\router\index.ts

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/splash',
    component: () => import ('../views/Temas.vue')
  },
  {
    path: '/detail',
    component: () => import ('../views/DetalleCabana.vue')
  },
  {
  path: '/sobre-nosotros',
  component: () => import('../views/SobreNosotros.vue')
  },
  {
    path: '/como-llegar',
    component: () => import('../views/ComoLlegar.vue')
  },
  {
    path: '/temas',
    component: () => import('../views/Temas.vue')
  },
  {
    path: '/agendar-cita',
    component: () => import('../views/DetalleCabana.vue')
  },
  {
    path: '/home',
    component: () => import('../views/InitialHome.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
