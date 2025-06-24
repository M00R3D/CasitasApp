<!-- src\views\DetalleCabana.vue -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ cabana?.nombre || 'Cargando...' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding" v-if="cabana">
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
            <h1 class="price">
              ${{ cabana?.precioPorNoche ? cabana.precioPorNoche.toFixed(2) : '0.00' }}
            </h1>          
              <p class="ion-text-muted">precio por noche</p>
              <p class="ion-text-muted">Máx. {{ cabana.capacidadMaxima }} huéspedes</p>
              <ion-button expand="block" @click="reservar">Reservar</ion-button>
            </div>
            

            
            <ion-item>
              <ion-label>Llegada</ion-label>
              <ion-datetime-button datetime="llegada" />
                <ion-datetime
                  id="llegada"
                  v-model="fechaLlegada"
                  :min="fechaMinima"
                  presentation="date"
                  :value="fechaLlegada || undefined"
                />
            </ion-item>

            <ion-item>
              <ion-label>Salida</ion-label>
              <ion-datetime-button datetime="salida" />
                <ion-datetime
                  id="salida"
                  v-model="fechaSalida"
                  :min="fechaLlegada || fechaMinima"
                  presentation="date"
                  :value="fechaSalida || undefined"
                />
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
            <ion-item v-for="(comentario, i) in cabana.comentarios" :key="i">
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

    <ion-content v-else class="ion-padding">
      <p>Cargando información...</p>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter,onBeforeRouteLeave } from 'vue-router'
import { cabanas } from '../data/cabanas.js'

const route = useRoute()
const router = useRouter()

const cabana = ref(null)

const fechaLlegada = ref(null)
const fechaSalida = ref(null)
const fechaMinima = new Date().toISOString().split('T')[0]

function cargarCabana() {
  const id = parseInt(route.params.id)

  if (isNaN(id)) {
    cabana.value = null
    return
  }

  cabana.value = cabanas.find(c => c.id === id)

  if (!cabana.value) {
    alert('Cabaña no encontrada')
  } else {
    cabana.value.imagenPrincipal = cabana.value.img
    cabana.value.imagenesPequenas = [cabana.value.img]
    fechaLlegada.value = null
    fechaSalida.value = null
  }
}

watch(
  () => route.params.id,
  () => {
    cargarCabana()
  },
  { immediate: true } // Se ejecuta al montar y en cada cambio
)

const cantidadNoches = computed(() => {
  if (!fechaLlegada.value || !fechaSalida.value) return 0
  const inicio = new Date(fechaLlegada.value)
  const fin = new Date(fechaSalida.value)
  const diffMs = fin - inicio
  const diffDias = diffMs / (1000 * 60 * 60 * 24)
  return diffDias > 0 ? diffDias : 0
})

const totalCalculado = computed(() => {
  return cabana.value ? cantidadNoches.value * cabana.value.precioPorNoche : 0
})

function cambiarImagenPrincipal(img) {
  if (cabana.value) {
    cabana.value.imagenPrincipal = img
  }
}

function verMasImagenes() {
  alert('Aquí puedes implementar una galería de imágenes.')
}

function reservar() {
  if (!fechaLlegada.value || !fechaSalida.value) {
    alert('Por favor selecciona las fechas de llegada y salida.')
    return
  }

  // Navegar a confirmacion-reserva pasando parámetros por query o params
  router.push({
    name: 'ConfirmacionReserva',
    params: { id: cabana.value.id },
    query: {
      llegada: fechaLlegada.value,
      salida: fechaSalida.value
    }
  })
}

onBeforeRouteLeave(() => {
  cabana.value = null
  fechaLlegada.value = null
  fechaSalida.value = null
})
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
