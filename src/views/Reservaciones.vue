<!-- src\views\Reservaciones.vue -->
<template>
  <ion-page>
    
    
    <ion-content>
      <ion-title>---------------</ion-title>
      <p>.................</p>
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBack" />
          </ion-button>
      <section class="section mt-2">
        <h2 class="section-title">Mis Reservaciones</h2>
        <Dashboard />
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/vue'

import { arrowBack } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import Dashboard from './Dashboard.vue'

const router = useRouter()

function goBack() {
  router.back()
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
.flecha-regresar {
  position: fixed;
  top: 20px;
  left: 16px;
  z-index: 9999;
}
</style>
