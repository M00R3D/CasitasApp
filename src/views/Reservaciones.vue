<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mis Reservaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <section class="section mt-2">
        <h2 class="section-title">Listado completo</h2>
        <Dashboard />
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import Dashboard from './Dashboard.vue'
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
</style>
