<!-- src/App.vue -->
<template>
  <ion-app>
    <!-- NAVBAR SUPERIOR -->
    <ion-header>
      <ion-toolbar class="custom-toolbar" >
        <ion-buttons slot="start">
          <ion-menu-button auto-hide="false"></ion-menu-button>
        </ion-buttons>

        <ion-title class="ion-text-center ion-hide-md-down">Casitas El Salitral</ion-title>

        <ion-buttons slot="end" class="ion-hide-sm-down">
          <ion-button @click="goToAgendarCita">
            Agendar Estancia
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- sidebar -->
    <ion-menu content-id="main-content" type="overlay">
      <ion-content>
        <ion-list>
          <ion-item button @click="navigateTo('/home')">Inicio</ion-item>
          <ion-item button @click="navigateTo('/sobre-nosotros')">Sobre Nosotros</ion-item>
          <ion-item button @click="navigateTo('/como-llegar')">¿Cómo llegar?</ion-item>
          <ion-item button @click="navigateTo('/temas')">Temas</ion-item>
        </ion-list>


        <!--Agendar-->
        <div class="ion-padding">
          <ion-button expand="block" color="secondary" @click="goToAgendarCita">
            Agendar Estancia
          </ion-button>
        </div>
      </ion-content>
    </ion-menu>
  
    <!-- MAIN -->
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script setup>
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonButton,
  IonRouterOutlet,
} from '@ionic/vue';

import { useRouter } from 'vue-router';

const router = useRouter();

function navigateTo(path) {
  router.push(path);
}

function goToAgendarCita() {
  router.push('/agendar-cita');
}
</script>


<style scoped>
/* Estilos opcionales para personalizar más adelante */
ion-toolbar {
  --background: #e0e0e0; /* azul primario de Ionic */
  --color: white;
}
.custom-toolbar {
  --background: #a8a8a8;
  --color: white;
}
</style>
