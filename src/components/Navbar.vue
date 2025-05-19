<template>
  <ion-header>
    <ion-toolbar>
      <!-- Botón para abrir el menú lateral -->
      <ion-buttons slot="start">
        <ion-menu-button />
      </ion-buttons>

      <ion-title>Mi App</ion-title>

      <!-- Opciones del menú como botones -->
      <ion-buttons slot="end">
        <template v-for="(p, index) in appPages" :key="index">
          <ion-button :router-link="p.url">
            <ion-icon :icon="p.iosIcon" slot="icon-only" />
          </ion-button>
        </template>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonTitle,
  IonIcon,
} from '@ionic/vue';

import { defineProps } from 'vue';

const props = defineProps<{
  appPages: {
    title: string;
    url: string;
    iosIcon: string;
    mdIcon: string;
  }[];
}>();
</script>

<style scoped>
ion-button {
  --padding-start: 6px;
  --padding-end: 6px;
}
</style>
