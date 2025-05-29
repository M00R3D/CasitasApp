<template>
  <nav class="navbar-wrapper border-bottom">
    <div class="container-fluid d-flex justify-content-between align-items-center flex-wrap py-2">
      <!-- Logo -->
      <div class="d-flex align-items-center gap-2 brand">
        <a href="/home">
          <img src="https://i.ibb.co/Tq7v2SD/path1584.png" alt="Logo" class="logo" />
        </a>
        <div class="logo-text">
          Casitas El Salitral<br />
          <small>Escápate a la naturaleza</small>
        </div>
      </div>

      <!-- Botón menú hamburguesa para móvil -->
      <button class="menu-button d-md-none" @click="toggleMenu">☰</button>

      <!-- Menú -->
      <div :class="['menu', isOpen ? 'open d-flex flex-column d-md-flex' : 'd-none d-md-flex']">
        <a href="#">Inicio</a>
        <a href="/sobre-nosotros">Sobre Nosotros</a>
        <a href="/como-llegar">¿Cómo llegar?</a>
        <a href="#">Temas</a>
      </div>

      <!-- Botón agendar -->
      <button class="btn btn-agendar ms-md-3 mt-2 mt-md-0" @click="goToDetalleCasita()">
        Agendar Estancia
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}



function goToDetalleCasita() {
  router.push('/detail')
}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';

.navbar-wrapper {
  background-color: #ffffff;
  width: 100%;
}

.container-fluid {
  padding-left: 0;
  padding-right: 0;
}

img {
  max-width: 100%;
  height: auto;
}

.brand {
  display: flex;
  align-items: center;
  flex: 1 0 auto;
}

.logo {
  width: 60px;
  height: auto;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
}

.menu-button {
  display: none;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}

.menu a {
  text-decoration: none;
  color: #444;
  font-weight: 500;
}

.menu.open {
  display: flex;
}

.btn-agendar {
  background-color: #f4a261;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    margin-top: 10px;
  }

  .menu.open {
    display: flex;
  }

  .menu-button {
    display: block;
  }

  .btn-agendar {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
