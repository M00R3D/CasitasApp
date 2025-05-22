<template>
  <IonModal :is-open="isOpen" @didDismiss="emit('cerrar')">
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Iniciar Sesión</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="emit('cerrar')">
            <IonIcon :icon="close" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <form @submit.prevent="handleLogin">
        <!-- Campo de Correo -->
        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            type="email"
            v-model="email"
            required
            autocomplete="off"
          />
        </IonItem>

        <!-- Campo de Contraseña -->
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            v-model="password"
            required
          />
        </IonItem>

        <!-- Error -->
        <IonText color="danger" v-if="error">
          <p class="ion-padding-start">{{ error }}</p>
        </IonText>

        <!-- Botón de Iniciar Sesión -->
        <div class="ion-padding-top">
          <IonButton expand="block" type="submit">Iniciar sesión</IonButton>
        </div>
      </form>
    </IonContent>
  </IonModal>
</template>

<script setup>
// Ionic imports
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonText
} from '@ionic/vue'
import { close } from 'ionicons/icons'

// Reactividad de Vue
import { ref } from 'vue'

// Props y eventos
const props = defineProps({
  isOpen: Boolean // Controla si el modal está abierto
})
const emit = defineEmits(['cerrar'])

// Estado reactivo
const email = ref('')
const password = ref('')
const error = ref('')

// Función para manejar el login
function handleLogin() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Por favor, completa todos los campos.'
    return
  }

  if (email.value === 'admin@example.com' && password.value === '1234') {
    alert('Inicio de sesión exitoso')
    emit('cerrar')
  } else {
    error.value = 'Correo o contraseña incorrectos.'
  }
}
</script>

<style scoped>
/* Puedes agregar más estilos personalizados si lo deseas */
</style>
