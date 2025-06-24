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
          <IonInput
            type="email"
            name="email"
            v-model="email"
            required
            autocomplete="off"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            name="password"
            v-model="password"
            required
          />
        </IonItem>

        <IonText color="danger" v-if="error">
          <p class="ion-padding-start">{{ error }}</p>
        </IonText>

        <div class="ion-padding-top">
          <IonButton expand="block" type="submit">Iniciar sesión</IonButton>
        </div>

        <div class="ion-text-center ion-margin-top">
          <IonText>
            <small @click="abrirRecuperacion" style="cursor:pointer; color: #3880ff;">¿Olvidaste tu contraseña?</small>
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
              <IonLabel position="floating">Nombre completo</IonLabel>
              <IonInput type="text" name="nombre" v-model="registro.nombre" required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Correo electrónico</IonLabel>
              <IonInput type="email" name="email" v-model="registro.email" required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput type="password" name="password" v-model="registro.password" required />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Confirmar contraseña</IonLabel>
              <IonInput type="password" name="confirmarPassword" v-model="registro.confirmarPassword" required />
            </IonItem>

            <IonItem>
              <IonLabel>Foto de perfil</IonLabel>
              <input type="file" name="foto" @change="handleFileUpload" accept="image/*" />
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
  email: '',
  password: '',
  confirmarPassword: '',
  foto: null
});

function handleLogin() {
  // Lógica para iniciar sesión
  console.log('Iniciar sesión con:', email.value, password.value);
  // Aquí conectar con backend
}

function handleRegister() {
  // Validación simple
  if (registro.value.password !== registro.value.confirmarPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  // Aquí se enviaría a la API con FormData si se incluye la foto
  const formData = new FormData();
  formData.append('nombre', registro.value.nombre);
  formData.append('email', registro.value.email);
  formData.append('password', registro.value.password);
  if (registro.value.foto) {
    formData.append('foto', registro.value.foto);
  }

  // Conectar con el backend
  console.log('Registrando usuario:', formData);
  mostrarRegistro.value = false;
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
