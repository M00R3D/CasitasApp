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
                ${{ typeof cabana?.precioPorNoche === 'number' ? cabana.precioPorNoche.toFixed(2) : '0.00' }}
              </h1>
              <p class="ion-text-muted">precio por noche</p>
              <p class="ion-text-muted">Máx. {{ cabana.capacidadMaxima }}</p>
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
import axios from 'axios'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import Footer from '../components/Footer.vue'

const route = useRoute()
const router = useRouter()

const cabana = ref(null)

const fechaLlegada = ref(null)
const fechaSalida = ref(null)
const fechaMinima = new Date().toISOString().split('T')[0]

async function cargarCabana() {
  const id = parseInt(route.params.id)

  if (isNaN(id)) {
    cabana.value = null
    return
  }

  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/cabins/${id}`)
    const data = res.data

    cabana.value = {
      id: data.id,
      nombre: data.name,
      descripcion: data.description,
      precioPorNoche: Number(data.price_per_night) || 0,
      capacidadMaxima: data.capacity,
      imagenPrincipal: data.images?.[0] || 'https://i.ibb.co/sv7MR8xV/Whats-App-Image-2025-06-27-at-1-37-05-AM-2.jpg',
      imagenesPequenas: data.images,
      comentarios: (data.reviwes || []).map(com => ({
        nombre: com.fisrt_name || 'Anónimo',
        estrellas: com.rating,
        mensaje: com.comment,
        fecha: com.date,
        foto: com.foto || 'https://i.ibb.co/PcgYQnv/avatar-default.png'
      }))
    }

    fechaLlegada.value = null
    fechaSalida.value = null

    setTimeout(() => {
      const llegada = document.getElementById('llegada')
      const salida = document.getElementById('salida')
      if (llegada) llegada.value = ''
      if (salida) salida.value = ''
    }, 100)

  } catch (err) {
    console.error('Error al obtener cabaña', err)
    alert('Cabaña no encontrada o error de conexión')
    cabana.value = null
  }
}

watch(
  () => route.params.id,
  () => {
    cargarCabana()
  },
  { immediate: true }
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
  position: relative;
}
.main-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}
.miniatures {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.mini-thumb {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}
.mini-thumb:hover {
  border-color: var(--ion-color-primary);
}
.price {
  font-size: 2rem;
  font-weight: bold;
}
.stars ion-icon {
  font-size: 1.1rem;
  color: #ffc107;
}
</style>
