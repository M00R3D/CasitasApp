<!-- src/views/FolderPage.vue -->
<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <!-- Título grande para móviles -->
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="spacer"></div>

      <!-- Galería de imágenes -->
      <ion-grid class="gallery-grid">
        <ion-row>
          <ion-col size-md="8" size="12">
            <ion-img
              class="main-img"
              src="https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg"
              alt="Principal"
            />
          </ion-col>
          <ion-col size-md="4" size="6">
            <ion-img
              class="thumb-img"
              src="https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg"
            />
          </ion-col>
          <ion-col size-md="4" size="6">
            <ion-img
              class="thumb-img"
              src="https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg"
            />
          </ion-col>
          <ion-col size-md="4" size="6">
            <ion-img
              class="thumb-img"
              src="https://i.ibb.co/gbSzPjQm/Whats-App-Image-2024-10-24-at-8-53-25-PM.jpg"
            />
          </ion-col>
        </ion-row>
      </ion-grid>

      <div class="spacer"></div>

      <!-- Componente adicional opcional -->
      <!-- <DashboardComponent /> -->

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue';
</script>

<style scoped>
.spacer {
  height: 2rem;
}

/* Imagen principal grande */
.main-img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

/* Imágenes pequeñas tipo galería */
.thumb-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.thumb-img:hover {
  transform: scale(1.03);
}

/* Alinear contenido */
.gallery-grid {
  padding: 1rem;
}
</style>
