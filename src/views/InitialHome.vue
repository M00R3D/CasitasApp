<!-- src\views\InitialHome.vue -->
<template>
  <ion-page>
    <!-- Modal de login -->
    <ion-modal :is-open="showLogin">
      <Login @cerrar="cerrarLogin" />
    </ion-modal>

    <!-- Título -->
    <ion-header>
      <ion-toolbar color="light">
        <ion-title class="ion-text-center">Casitas El Salitral</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Dashboard -->
      <Dashboard />

      <!-- Galería principal -->
      <!-- <ion-grid class="ion-padding">
        <ion-row>
          <ion-col size-md="8" size="12">
            <ion-img
              src="https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg"
              class="rounded-img"
            />
          </ion-col>

          <ion-col size-md="4" size="6">
            <ion-img
              src="https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg"
              class="rounded-img"
            />
          </ion-col>

          <ion-col size-md="4" size="6">
            <ion-img
              src="https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg"
              class="rounded-img"
            />
          </ion-col>

          <ion-col size-md="4" size="6">
            <ion-img
              src="https://i.ibb.co/gbSzPjQm/Whats-App-Image-2024-10-24-at-8-53-25-PM.jpg"
              class="rounded-img"
            />
          </ion-col>
        </ion-row>
      </ion-grid> -->

      <!-- Sección de Cabañas -->
      <ion-grid class="ion-padding">
        <Cabanas />
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonGrid, IonRow, IonCol, IonImg } from '@ionic/vue'

import Dashboard from './Dashboard.vue'
import Cabanas from './Cabanas.vue'
import Login from './Login.vue'

const showLogin = ref(true)

function cerrarLogin() {
  showLogin.value = false
}
</script>

<style scoped>
.rounded-img {
  border-radius: 10px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
