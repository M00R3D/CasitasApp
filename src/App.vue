<!-- src/App.vue -->
<template>
  <ion-app>
    <Navbar />

    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <!-- Aquí tu menú personalizado -->
          <div :class="['menu', isOpen ? 'open d-flex flex-column d-md-flex' : 'd-none d-md-flex']" style="padding: 1rem;">
            <ion-list>
              <ion-item button @click="navigateTo('inicio')">Inicio</ion-item>
              <ion-item button @click="navigateTo('sobre-nosotros')">Sobre Nosotros</ion-item>
              <ion-item button @click="navigateTo('como-llegar')">¿Cómo llegar?</ion-item>
              <ion-item button @click="navigateTo('temas')">Temas</ion-item>
            </ion-list>
            <div style="padding: 1rem;">
              <ion-button expand="block" class="btn-agendar" @click="goToAgendarCita()">
                Agendar Estancia
              </ion-button>
            </div>
          </div>
        </ion-content>
      </ion-menu>


      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Navbar from './components/Navbar.vue';

import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';

import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from 'ionicons/icons';

const selectedIndex = ref(0);

const appPages = [
  { title: 'Inbox', url: '/folder/Inbox', iosIcon: mailOutline, mdIcon: mailSharp },
  { title: 'Outbox', url: '/folder/Outbox', iosIcon: paperPlaneOutline, mdIcon: paperPlaneSharp },
  { title: 'Favorites', url: '/folder/Favorites', iosIcon: heartOutline, mdIcon: heartSharp },
  { title: 'Archived', url: '/folder/Archived', iosIcon: archiveOutline, mdIcon: archiveSharp },
  { title: 'Trash', url: '/folder/Trash', iosIcon: trashOutline, mdIcon: trashSharp },
  { title: 'Spam', url: '/folder/Spam', iosIcon: warningOutline, mdIcon: warningSharp },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

// Para detectar el path y marcar la página seleccionada
const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  const index = appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
  if (index !== -1) {
    selectedIndex.value = index;
  }
}
</script>

<style scoped>
/* Opcional: estilos para marcar el item seleccionado */
.selected {
  background-color: var(--ion-color-primary);
  color: white;
}
</style>
