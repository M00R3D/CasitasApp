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

    <!-- Modal de Login, fuera de ion-content -->
    <ion-modal :is-open="showLogin" @didDismiss="cerrarLogin">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Iniciar Sesión</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="cerrarLogin">
              <ion-icon :icon="close" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form @submit.prevent="handleLogin">
          <ion-item>
            <ion-label position="floating">Correo electrónico</ion-label>
            <ion-input type="email" v-model="email" required autocomplete="off" />
          </ion-item>
          <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="password" required />
          </ion-item>
          <ion-text color="danger" v-if="error">
            <p class="ion-padding-start">{{ error }}</p>
          </ion-text>
          <div class="ion-padding-top">
            <ion-button expand="block" type="submit">Iniciar sesión</ion-button>
          </div>
        </form>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonButton, IonModal, IonIcon, IonItem,
  IonLabel, IonInput, IonText, IonGrid, IonRow, IonCol, IonImg
} from '@ionic/vue'
import { close } from 'ionicons/icons'

import Dashboard from './Dashboard.vue'
import Cabanas from './Cabanas.vue'

const showLogin = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')

function cerrarLogin() {
  showLogin.value = false
}

function handleLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Por favor, completa todos los campos.'
    return
  }
  if (email.value === 'admin@example.com' && password.value === '1234') {
    alert('Inicio de sesión exitoso')
    cerrarLogin()
  } else {
    error.value = 'Correo o contraseña incorrectos.'
  }
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
