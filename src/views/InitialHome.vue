<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Inicio</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showLogin = true">Iniciar Sesión</ion-button>
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


    <Login :isOpen="showLogin" @cerrar="cerrarLogin" />
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton
} from '@ionic/vue'

import Dashboard from './Dashboard.vue'
import DashboardHome from '@/components/DashboardHome.vue'
import Cabanas from './Cabanas.vue'
import Login from './Login.vue'
import Banner from './Banner.vue'

const showLogin = ref(true)

function cerrarLogin() {
  showLogin.value = false
}
</script>

<style scoped>
.section {
  padding: 0 1rem;
}

.section-title {
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.mt-2 {
  margin-top: 2rem;
}
.mt-3 {
  margin-top: 3rem;
}

</style>
