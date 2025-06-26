// src\router\index.ts

import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes= [
  {
    path: '',
    redirect: '/home',
    name: 'Home',

  },
  {
    path: '/splash',
    component: () => import ('../views/Temas.vue')
  },
  // {
  //   path: '/detail',
  //   component: () => import ('../views/DetalleCabana.vue')
  // },
  {
    path: '/detail/:id',
    component: () => import('../views/DetalleCabana.vue')
  },
  {
  path: '/confirmacion-reserva/:id',
  name: 'ConfirmacionReserva',
  component: () => import('../views/ConfirmacionReserva.vue'),
  props: true
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
  },
  {
  path: '/notificaciones',
  name: 'Notificaciones',
  component: () => import('../views/Notificaciones.vue')
  },
    {
    path: '/reservaciones',
    name: 'Reservaciones',
    component: () => import('../views/Reservaciones.vue')
}

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
