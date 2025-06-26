<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Mi Perfil</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="close" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Botón regresar -->
      <ion-button @click="goBack" class="btn-regreso">
        <ion-icon :icon="arrowBack" />
      </ion-button>

      <!-- Nombre -->
      <ion-item>
        <ion-label>Nombre: {{ perfil.nombre }}</ion-label>
        <ion-button fill="clear" size="small" @click="editando.nombre = true">Editar</ion-button>
      </ion-item>
      <ion-item v-if="editando.nombre">
        <ion-input v-model="perfil.nombre" placeholder="Nuevo nombre" />
        <ion-button size="small" @click="editando.nombre = false">Guardar</ion-button>
      </ion-item>

      <!-- Apellido -->
      <ion-item>
        <ion-label>Apellido: {{ perfil.apellido }}</ion-label>
        <ion-button fill="clear" size="small" @click="editando.apellido = true">Editar</ion-button>
      </ion-item>
      <ion-item v-if="editando.apellido">
        <ion-input v-model="perfil.apellido" placeholder="Nuevo apellido" />
        <ion-button size="small" @click="editando.apellido = false">Guardar</ion-button>
      </ion-item>

      <!-- Teléfono -->
      <ion-item>
        <ion-label>Teléfono: {{ perfil.telefono }}</ion-label>
        <ion-button fill="clear" size="small" @click="editando.telefono = true">Editar</ion-button>
      </ion-item>
      <ion-item v-if="editando.telefono">
        <ion-input v-model="perfil.telefono" placeholder="Nuevo teléfono" />
        <ion-button size="small" @click="editando.telefono = false">Guardar</ion-button>
      </ion-item>

      <!-- Correo -->
      <ion-item>
        <ion-label>Email: {{ perfil.email }}</ion-label>
        <ion-button fill="clear" size="small" @click="editando.email = true">Editar</ion-button>
      </ion-item>
      <ion-item v-if="editando.email">
        <ion-input v-model="perfil.email" placeholder="Nuevo email" />
        <ion-button size="small" @click="editando.email = false">Guardar</ion-button>
      </ion-item>

      <!-- Contraseña -->
      <ion-item>
        <ion-label>Contraseña: ********</ion-label>
        <ion-button fill="clear" size="small" @click="editando.password = true">Editar</ion-button>
      </ion-item>
      <ion-item v-if="editando.password">
        <ion-input type="password" v-model="perfil.password" placeholder="Nueva contraseña" />
        <ion-button size="small" @click="editando.password = false">Guardar</ion-button>
      </ion-item>

      <!-- Foto de perfil -->
      <ion-item>
        <ion-label>Foto de perfil</ion-label>
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </ion-item>

      <!-- Botón Panel Admin -->
      <div class="ion-padding-top">
        <ion-button expand="block" color="warning" @click="irAdmin">
          Panel de Administración
        </ion-button>
      </div>

      <!-- Botón Guardar General -->
      <div class="ion-padding-top">
        <ion-button expand="block" color="tertiary" @click="guardarCambios">
          Guardar Todo
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonButton, IonIcon, IonContent, IonItem, IonLabel, IonInput
} from '@ionic/vue';
import { close, arrowBack } from 'ionicons/icons';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const perfil = ref({
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  password: '',
  foto: null
});

const editando = ref({
  nombre: false,
  apellido: false,
  telefono: false,
  email: false,
  password: false
});

function goBack() {
  router.back();
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) perfil.value.foto = file;
}

function irAdmin() {
  router.push('/admin');
}

function cargarPerfil() {
  // Simulación de datos
  const datosFake = {
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '555-123-4567',
    email: 'juanperez@mail.com'
  };
  perfil.value = { ...perfil.value, ...datosFake };
}

function guardarCambios() {
  console.log('Datos actualizados:', perfil.value);
  alert('Cambios guardados (simulado)');
}

onMounted(() => {
  cargarPerfil();
});
</script>

<style scoped>
.btn-regreso {
  margin-bottom: 12px;
}
</style>
