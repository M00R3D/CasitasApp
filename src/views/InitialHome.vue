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
      <div class="section">
        <Dashboard />
      </div>

      <div class="section mt-4">
        <Banner
          imgSrc="https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg"
          titulo="Encuentra tu espacio de descanso ideal"
          subtitulo="Reserva tu casita favorita con un par de clics"
        />
      </div>

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
import Cabanas from './Cabanas.vue'
import Login from './Login.vue'
import Banner from './Banner.vue'

const showLogin = ref(false)

function cerrarLogin() {
  showLogin.value = false
}
</script>

<style scoped>
.mt-2 {
  margin-top: 2rem;
}

.mt-3 {
  margin-top: 3rem;
}
.mt-4 {
  margin-top: 8rem;
}

.p-2 {
  padding: 2rem;
}

.px-2 {
  padding-left: 2rem;
  padding-right: 2rem;
}

.section {
  padding: 0 1rem;
}
</style>
