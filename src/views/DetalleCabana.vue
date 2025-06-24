<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ cabana.nombre }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Grid principal -->
      <ion-grid>
        <ion-row>
          <!-- Columna de imágenes -->
          <ion-col size-md="6" size="12">
            <div class="main-image-container">
              <ion-img :src="cabana.imagenPrincipal" class="main-image" />
              <div class="miniatures">
                <ion-img
                  v-for="(img, index) in cabana.imagenesPequenas"
                  :key="index"
                  :src="img"
                  class="mini-thumb"
                  @click="cambiarImagenPrincipal(img)"
                />
                <ion-button fill="outline" size="small" @click="verMasImagenes">
                  + Ver más imágenes
                </ion-button>
              </div>
            </div>
          </ion-col>

          <!-- Columna de info -->
          <ion-col size-md="6" size="12">
            <div class="ion-margin-bottom">
              <h1 class="price">${{ cabana.precio.toFixed(2) }}</h1>
              <p class="ion-text-muted">precio por noche</p>
              <p class="ion-text-muted">Máx. {{ cabana.maxHuespedes }} huéspedes</p>
              <ion-button expand="block" @click="reservar">Reservar</ion-button>
            </div>

            <ion-item>
              <ion-label>Llegada</ion-label>
              <ion-datetime-button datetime="llegada" />
              <ion-modal keep-contents-mounted>
                <ion-datetime id="llegada" v-model="fechaLlegada" :min="fechaMinima" presentation="date" />
              </ion-modal>
            </ion-item>

            <ion-item>
              <ion-label>Salida</ion-label>
              <ion-datetime-button datetime="salida" />
              <ion-modal keep-contents-mounted>
                <ion-datetime id="salida" v-model="fechaSalida" :min="fechaLlegada || fechaMinima" presentation="date" />
              </ion-modal>
            </ion-item>

            <ion-card v-if="cantidadNoches > 0" class="ion-margin-top">
              <ion-card-header>
                <ion-card-title>Resumen de Reserva</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p><strong>Noches:</strong> {{ cantidadNoches }}</p>
                <p><strong>Total a pagar:</strong> ${{ totalCalculado.toFixed(2) }} MXN</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Comentarios -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Comentarios</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="(comentario, i) in comentarios" :key="i">
              <ion-avatar slot="start">
                <ion-img :src="comentario.foto" />
              </ion-avatar>
              <ion-label>
                <h2>{{ comentario.nombre }}</h2>
                <div class="stars">
                  <ion-icon
                    v-for="n in 5"
                    :key="n"
                    :icon="n <= comentario.estrellas ? 'star' : 'star-outline'"
                    color="warning"
                  />
                </div>
                <p class="ion-text-muted">{{ comentario.fecha }}</p>
                <p>{{ comentario.mensaje }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <Footer />
    </ion-content>
  </ion-page>

</template>

<script setup>
import Footer from '../components/Footer.vue'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton,
  IonItem,
  IonLabel,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonAvatar,
  IonList,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from '@ionic/vue'
import { ref , computed} from 'vue'
import { star, starOutline } from 'ionicons/icons'
const fechaLlegada = ref(null)
const fechaSalida = ref(null)
const fechaMinima = new Date().toISOString().split('T')[0]

const cantidadNoches = computed(() => {
  if (!fechaLlegada.value || !fechaSalida.value) return 0
  const inicio = new Date(fechaLlegada.value)
  const fin = new Date(fechaSalida.value)
  const diffMs = fin - inicio
  const diffDias = diffMs / (1000 * 60 * 60 * 24)
  return diffDias > 0 ? diffDias : 0
})

const totalCalculado = computed(() => {
  return cantidadNoches.value * cabana.value.precio
})
const cabana = ref({
  nombre: 'La Casita Color Menta',
  precio: 1795.99,
  maxHuespedes: 2,
  imagenPrincipal: 'https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg',
  imagenesPequenas: [
    'https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg',
    'https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg',
    'https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg',
  ],
})

const comentarios = ref([
  {
    nombre: 'Alexis',
    estrellas: 5,
    mensaje: 'Estancia de varias noches, lugar perfecto y tranquilo.',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    fecha: 'Hace 2 semanas',
  },
  {
    nombre: 'Caleb',
    estrellas: 4,
    mensaje: 'Muy buena experiencia, recomendable.',
    foto: 'https://randomuser.me/api/portraits/men/44.jpg',
    fecha: 'Hace 3 semanas',
  },
  {
    nombre: 'Sucharitha',
    estrellas: 5,
    mensaje: 'Perfecto para familias, espacio amplio y limpio.',
    foto: 'https://randomuser.me/api/portraits/women/68.jpg',
    fecha: 'Marzo 2025',
  },
])

// const fechaLlegada = ref(null)
// const fechaSalida = ref(null)

// const fechaMinima = new Date().toISOString().split('T')[0]

function cambiarImagenPrincipal(img) {
  cabana.value.imagenPrincipal = img
}

function verMasImagenes() {
  alert('Aquí puedes implementar una galería de imágenes.')
}

function reservar() {
  alert(`Reservando ${cabana.value.nombre} del ${fechaLlegada.value} al ${fechaSalida.value}`)
}
</script>

<style scoped>
.main-image-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.main-image {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  max-height: 300px;
}

.miniatures {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.mini-thumb {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.mini-thumb:hover {
  border-color: var(--ion-color-primary);
}

.price {
  font-size: 2.5rem;
  color: var(--ion-color-primary);
  margin-bottom: 0.5rem;
}

.stars ion-icon {
  font-size: 1rem;
}

ion-card-content p {
  font-size: 1.1rem;
}

ion-card-content strong {
  color: var(--ion-color-primary);
}

</style>
