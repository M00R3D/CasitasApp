<!-- src\views\InitialHome.vue -->
<template>
  <ion-page>
    <!-- Header con botón de login -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Inicio</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showLogin = true">Iniciar Sesión</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- ÚNICO ion-content que contiene TODO el scroll -->
    <ion-content>

      <!-- Dashboard en la parte superior -->
      <Dashboard />
      <Dashboard />

      <!-- Galería principal inmediatamente debajo -->
      <ion-grid class="ion-padding">
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
          <!-- ... más columnas si las hay -->
        </ion-row>
      </ion-grid>

      <!-- Sección de Cabañas justo debajo de la galería -->
      <Cabanas />

    </ion-content>
    <Login :isOpen="showLogin" @cerrar="cerrarLogin" />
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonGrid, IonRow, IonCol, IonImg
} from '@ionic/vue'
import { close } from 'ionicons/icons'

import Dashboard from './Dashboard.vue'
import Cabanas from './Cabanas.vue'
import Login from './Login.vue'

const showLogin = ref(false)

onMounted(() => {
  showLogin.value = true
})

function cerrarLogin() {
  showLogin.value = false
}
</script>



<style scoped>
.rounded-img {
  border-radius: 10px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 333px;
}
</style>
