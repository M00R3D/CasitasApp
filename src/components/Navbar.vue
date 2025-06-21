<template>
  <ion-header>
    <ion-toolbar class="custom-toolbar">
      <!-- Menú + Logo juntos -->
      <ion-buttons slot="start" class="start-group">
        <!-- Botón hamburguesa -->
        <ion-menu-button class="menu-icon d-md-none" />

        <!-- Logo clickeable que lleva a /home -->
        <router-link to="/home" class="logo-link">
          <img
            src="https://i.ibb.co/Tq7v2SD/path1584.png"
            alt="Logo"
            class="logo-img"
          />
        </router-link>
      </ion-buttons>

      <!-- Botón Agendar en desktop -->
      <ion-buttons slot="end" class="d-none d-md-flex">
        <ion-button color="tertiary" @click="goToDetalleCasita">
          Agendar Estancia
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToDetalleCasita() {
  router.push('/detail');
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

.menu-icon {
  font-size: 28px;
  width: 44px;
  height: 44px;
  --color: #444;
}

/* Logo como link */
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

/* Botón Agendar */
ion-button {
  font-weight: bold;
  padding: 0 16px;
}
</style>
