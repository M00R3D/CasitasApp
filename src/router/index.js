import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes = [
  {
    path: '',
    redirect: '/home',
    name: 'Home'
  },
  {
    path: '/splash',
    component: () => import('../views/Temas.vue')
  },
  {
    path: '/detail/:id',
    component: () => import('../views/DetalleCabana.vue')
  },
  {
    path: '/confirmacion-reserva/:id',
    name: 'ConfirmacionReserva',
    component: () => import('../views/ConfirmacionReserva.vue'),
    props: true,
    meta: { requiresAuth: true } // Aquí decides si protegerla
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
    component: () => import('../views/Notificaciones.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reservaciones',
    name: 'Reservaciones',
    component: () => import('../views/Reservaciones.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import('../views/AdminPanel.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next('/home');
    
    // Enviar un evento global con mensaje personalizado
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('mostrar-login', {
        detail: { mensaje: 'Inicia sesión o regístrate para acceder a esta pestaña' }
      }));
    }, 100); // Pequeño retraso para que se complete la redirección

  } else {
    next();
  }
});


export default router;
