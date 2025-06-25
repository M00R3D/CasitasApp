<template>
<IonModal :is-open="isOpen" @didDismiss="$emit('cerrar')">
  <IonHeader>
    <IonToolbar color="primary">
      <IonTitle>Iniciar Sesión</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="$emit('cerrar')">
          <IonIcon :icon="close" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>

  <IonContent class="ion-padding">
    <!-- Formulario de Login -->
    <form @submit.prevent="handleLogin">
      <IonItem>
        <IonLabel position="floating">Correo electrónico</IonLabel>
        <IonInput type="email" v-model="email" required autocomplete="off" />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Contraseña</IonLabel>
        <IonInput type="password" v-model="password" required />
      </IonItem>

      <IonText color="danger" v-if="error">
        <p class="ion-padding-start">{{ error }}</p>
      </IonText>

      <div class="ion-padding-top">
        <IonButton expand="block" type="submit">Iniciar sesión</IonButton>
      </div>

      <div class="ion-text-center ion-margin-top">
        <IonText>
          <small @click="abrirRecuperacion" style="cursor:pointer; color: #3880ff;">
            ¿Olvidaste tu contraseña?
          </small>
        </IonText>
      </div>

      <div class="ion-text-center ion-margin-top">
        <IonText>
          <small>¿No tienes cuenta?
            <span @click="mostrarRegistro = true" style="cursor:pointer; color: #3880ff;">
              Regístrate
            </span>
          </small>
        </IonText>
      </div>
    </form>

    <!-- Modal de Registro -->
    <IonModal :is-open="mostrarRegistro" @didDismiss="mostrarRegistro = false">
      <IonHeader>
        <IonToolbar color="secondary">
          <IonTitle>Registro</IonTitle>
          <IonButtons slot="end">
            <IonButton @click="mostrarRegistro = false">
              <IonIcon :icon="close" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <form @submit.prevent="handleRegister">
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput type="text" v-model="registro.nombre" required />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Apellido</IonLabel>
            <IonInput type="text" v-model="registro.apellido" required />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Teléfono</IonLabel>
            <IonInput type="tel" v-model="registro.telefono" required />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput type="email" v-model="registro.email" required />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" v-model="registro.password" required />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Confirmar contraseña</IonLabel>
            <IonInput type="password" v-model="registro.confirmarPassword" required />
          </IonItem>

          <IonItem>
            <IonLabel>Foto de perfil</IonLabel>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              @change="handleFileUpload"
            />
          </IonItem>

          <div class="ion-padding-top">
            <IonButton expand="block" type="submit">Registrarse</IonButton>
          </div>
        </form>
      </IonContent>
    </IonModal>
  </IonContent>
</IonModal>

</template>

<script setup>
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText
} from '@ionic/vue';
import { close } from 'ionicons/icons';
import { ref } from 'vue';
import axios from 'axios';

const emit = defineEmits(['cerrar']);

const props = defineProps({
  isOpen: Boolean
});

const email = ref('');
const password = ref('');
const error = ref('');
const mostrarRegistro = ref(false);

const registro = ref({
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  password: '',
  confirmarPassword: '',
  foto: null
});

async function handleLogin() {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value
    });
    console.log('Login exitoso:', response.data);
    error.value = '';
    emit('cerrar');
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    error.value = 'Correo o contraseña incorrectos';
  }
}

async function handleRegister() {
  if (registro.value.password !== registro.value.confirmarPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const formData = new FormData();
  formData.append('first_name', registro.value.nombre);
  formData.append('last_name', registro.value.apellido);
  formData.append('telefono', registro.value.telefono);
  formData.append('email', registro.value.email);
  formData.append('password', registro.value.password);
  if (registro.value.foto) {
    formData.append('foto', registro.value.foto);
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    console.log('Registro exitoso:', response.data);
    mostrarRegistro.value = false;
  } catch (err) {
    console.error('Error al registrar:', err);
    alert('Hubo un error al registrar el usuario.');
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    registro.value.foto = file;
  }
}

function abrirRecuperacion() {
  alert('Funcionalidad aún no implementada.');
}
</script>
