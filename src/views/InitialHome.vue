<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Inicio</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="abrirLoginManual">Iniciar Sesión</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <section class="section mt-2">
        <h2 class="section-title">Tus Reservaciones</h2>
        <DashboardHome />
        <Banner
          imgSrc="https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg"
          titulo="Encuentra tu espacio de descanso ideal"
          subtitulo="Reserva tu casita favorita con un par de clics"
        />
      </section>

      <div class="section mt-3">
        <Cabanas />
      </div>
    </ion-content>

    <Login :isOpen="showLogin" :mensaje="mensajeLogin" @cerrar="showLogin = false" />
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton
} from '@ionic/vue';
import DashboardHome from '@/components/DashboardHome.vue';
import Cabanas from './Cabanas.vue';
import Login from './Login.vue';
import Banner from './Banner.vue';

const showLogin = ref(false);
const mensajeLogin = ref('');

function abrirLoginManual() {
  mensajeLogin.value = '';
  showLogin.value = true;
}

onMounted(() => {
  window.addEventListener('mostrar-login', (e) => {
    mensajeLogin.value = e.detail?.mensaje || 'Inicia sesión o regístrate para continuar';
    showLogin.value = true;
  });
});

onUnmounted(() => {
  window.removeEventListener('mostrar-login', () => {});
});
</script>
