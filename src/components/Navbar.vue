<template>
  <ion-header>
    <ion-toolbar class="custom-toolbar">
      <!-- Menú + Logo -->
      <ion-buttons slot="start" class="start-group">
        <ion-menu-button class="menu-icon d-md-none" />
        <router-link to="/home" class="logo-link">
          <img
            src="https://i.ibb.co/Tq7v2SD/path1584.png"
            alt="Logo"
            class="logo-img black-logo"
          />
        </router-link>
      </ion-buttons>

      <!-- Botones derecha -->
      <ion-buttons slot="end" class="button-group">
        <!-- Botón notificaciones -->
        <ion-button @click="presentPopover($event)">
          <ion-icon :icon="notificationsOutline" slot="icon-only" />
        </ion-button>

        <!-- Botón Agendar -->
        <ion-button class="d-none d-md-flex" color="tertiary" @click="goToDetalleCasita">
          Agendar Estancia
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <!-- Popover Notificaciones -->
  <ion-popover
    :is-open="popoverOpen"
    :event="popoverEvent"
    @didDismiss="popoverOpen = false"
    show-backdrop="false"
  >
    <ion-content class="popover-content">
      <div class="popover-header">Notificaciones</div>
      <ion-list lines="none">
        <ion-item v-for="(noti, index) in notifications.slice(0, 3)" :key="index">
          <ion-icon :icon="notificationsOutline" slot="start" color="medium" />
          <ion-label>{{ noti }}</ion-label>
        </ion-item>
      </ion-list>
      <div class="popover-footer">
        <ion-button size="medium" fill="clear" @click="goToNotificaciones">
          Ver más
        </ion-button>
      </div>
    </ion-content>
  </ion-popover>
</template>

<script setup>
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonIcon,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
import { notificationsOutline } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const notifications = [
  'Tu reserva ha sido confirmada',
  'Nueva promoción disponible',
  'Casita disponible para este fin de semana'
];

const popoverOpen = ref(false);
const popoverEvent = ref(null);

function presentPopover(event) {
  popoverEvent.value = event;
  popoverOpen.value = true;
}

function goToDetalleCasita() {
  router.push('/detail');
}

function goToNotificaciones() {
  popoverOpen.value = false;
  router.push('/notificaciones');
}
</script>

<style scoped>
.custom-toolbar {
  --background: #ffffff;
  --color: #333;
  height: 64px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.start-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  width: 48px;
  height: auto;
  padding: 2px;
}

/* Para oscurecer el logo si no tienes una versión negra */
.black-logo {
  filter: brightness(0); /* Esto lo vuelve negro */
}

/* Menú hamburguesa */
.menu-icon {
  font-size: 28px;
  width: 44px;
  height: 44px;
  --color: #444;
}

/* Botones a la derecha */
.button-group ion-button {
  margin-left: 8px;
}

/* Estilos del popover */
.popover-content {
  min-width: 160px;
  border-radius: 12px;
  padding: 0;
}

.popover-header {
  padding: 12px 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.popover-footer {
  padding: 2px 6px;
  border-top: 1px solid #eee;
  text-align: center;
}
</style>
