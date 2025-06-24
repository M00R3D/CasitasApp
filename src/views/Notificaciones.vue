<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>Notificaciones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      
      <h2>No leídas</h2>
      <ion-list>
        <ion-item
          v-for="noti in noLeidas"
          :key="noti.id"
          button
          @click="expandir(noti)"
          :color="getColor(noti.tipo)"
        >
          <ion-icon :icon="getIcon(noti.tipo)" slot="start" />
          <ion-label>
            <h3>{{ noti.titulo }}</h3>
            <p>{{ noti.mensaje }}</p>
          </ion-label>
          <ion-icon :icon="chevronDownOutline" slot="end" />

        </ion-item>
      </ion-list>

      <h2 class="ion-margin-top">Leídas</h2>
      <ion-list>
        <ion-item
          v-for="noti in leidas"
          :key="noti.id"
          button
          @click="expandir(noti)"
          :color="getColor(noti.tipo)"
        >
          <ion-icon :icon="getIcon(noti.tipo)" slot="start" />
          <ion-label>
            <h3>{{ noti.titulo }}</h3>
            <p>{{ noti.mensaje }}</p>
          </ion-label>
         <ion-icon :icon="chevronDownOutline" slot="end" />

        </ion-item>
      </ion-list>

      <!-- Modal Detalle Notificación -->
      <ion-modal :is-open="modalAbierto" @didDismiss="cerrar">
        <ion-content class="ion-padding">
          <h2>{{ seleccionada?.titulo }}</h2>
          <p><strong>Mensaje:</strong> {{ seleccionada?.mensaje }}</p>
          <p><strong>Fecha:</strong> {{ seleccionada?.fecha }}</p>
          <p><strong>Tipo:</strong> {{ seleccionada?.tipo }}</p>
          
          <ion-button expand="block" color="success" v-if="!seleccionada?.leida" @click="marcarComoLeida(seleccionada.id)">
           <ion-icon :icon="eyeOutline" slot="start" />

            Marcar como Leída
          </ion-button>

          <ion-button expand="block" color="medium" v-else @click="marcarComoNoLeida(seleccionada.id)">
           <ion-icon :icon="eyeOffOutline" slot="start" />

            Marcar como No Leída
          </ion-button>

          <ion-button expand="block" color="danger" @click="cerrar">
            Cerrar
          </ion-button>
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonIcon, IonModal, IonButton
} from '@ionic/vue';

import { ref, computed } from 'vue';
import {
  checkmarkCircleOutline, warningOutline, notificationsOutline,
  timeOutline, eyeOutline, eyeOffOutline, chevronDownOutline
} from 'ionicons/icons';

// Simulación de notificaciones
const notificaciones = ref([
  { id: 1, usuarioId: 4, titulo: "Reserva confirmada", mensaje: "Tu reserva ha sido confirmada.", tipo: "confirmacion", leida: false, fecha: "2025-06-23" },
  { id: 2, usuarioId: 4, titulo: "Error de sesión", mensaje: "Tu sesión expiró. Inicia sesión nuevamente.", tipo: "error", leida: false, fecha: "2025-06-22" },
  { id: 3, usuarioId: 4, titulo: "Recordatorio", mensaje: "Tu estancia comienza mañana.", tipo: "recordatorio", leida: true, fecha: "2025-06-21" }
]);

const noLeidas = computed(() => notificaciones.value.filter(n => !n.leida));
const leidas = computed(() => notificaciones.value.filter(n => n.leida));

const modalAbierto = ref(false);
const seleccionada = ref(null);

function expandir(noti) {
  seleccionada.value = noti;
  modalAbierto.value = true;
}

function cerrar() {
  modalAbierto.value = false;
  seleccionada.value = null;
}

function marcarComoLeida(id) {
  const noti = notificaciones.value.find(n => n.id === id);
  if (noti) noti.leida = true;
  cerrar();
}

function marcarComoNoLeida(id) {
  const noti = notificaciones.value.find(n => n.id === id);
  if (noti) noti.leida = false;
  cerrar();
}

function getIcon(tipo) {
  switch (tipo) {
    case "confirmacion": return checkmarkCircleOutline;
    case "error": return warningOutline;
    case "recordatorio": return timeOutline;
    default: return notificationsOutline;
  }
}

function getColor(tipo) {
  switch (tipo) {
    case "confirmacion": return "success";
    case "error": return "danger";
    case "recordatorio": return "warning";
    default: return "";
  }
}
</script>

<style scoped>
h2 {
  margin-top: 1rem;
  font-size: 1.2rem;
}

ion-item {
  margin-bottom: 6px;
}

ion-modal h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

ion-modal p {
  margin: 0.5rem 0;
}
</style>
