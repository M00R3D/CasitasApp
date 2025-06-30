<!-- src\components\DashboardHome.vue -->
<template>
  <div>
    <IonGrid class="ion-margin-top">
      <IonRow class="header-row">
        <IonCol>Estado</IonCol>
        <IonCol>Casita</IonCol>
        <IonCol>Costo</IonCol>
        <IonCol>Llegada</IonCol>
        <IonCol>Salida</IonCol>
        <IonCol>Detalle</IonCol>
      </IonRow>

      <IonRow v-for="(reserva, index) in primerasTres" :key="index">
        <IonCol :class="estadoClase(reserva)">
          {{ calcularEstado(reserva.llegada, reserva.salida, reserva.cancelada) }}
        </IonCol>
        <IonCol>{{ reserva.casita }}</IonCol>
        <IonCol>${{ reserva.costo.toLocaleString('es-MX') }}</IonCol>
        <IonCol>{{ formatFecha(reserva.llegada) }}</IonCol>
        <IonCol>{{ formatFecha(reserva.salida) }}</IonCol>
        <IonCol>
          <IonButton fill="clear" size="small" @click="verDetalle(reserva)">
            <IonIcon :icon="eyeOutline" />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>

    <div class="ion-text-center ion-margin-top">
      <IonButton fill="outline" size="small" color="primary" @click="verMas">
        Ver Más
      </IonButton>
    </div>
  </div>
</template>

<script setup>
import {
  IonGrid, IonRow, IonCol, IonButton, IonIcon
} from '@ionic/vue'
import { ref, computed, onMounted } from 'vue'
import { eyeOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const reservaciones = ref([])

function fetchReservaciones() {
  axios.get('http://localhost:8000/api/reservations')  // Ajusta al dominio o IP de tu backend
    .then(response => {
      reservaciones.value = response.data.map(r => ({
        casita: r.cabin?.name || `ID ${r.cabin_id}`,
        costo: r.total,
        llegada: r.start_date,
        salida: r.end_date,
        cancelada: r.status.toLowerCase() === 'cancelada'
      }))
    })
    .catch(error => console.error('Error al obtener reservaciones:', error))
}


onMounted(fetchReservaciones)

const primerasTres = computed(() => reservaciones.value.slice(0, 3))

function calcularEstado(llegada, salida, cancelada) {
  if (cancelada) return 'Cancelada'
  const hoy = new Date()
  const fLlegada = new Date(llegada)
  const fSalida = new Date(salida)
  if (hoy >= fLlegada && hoy <= fSalida) return 'En curso'
  if (hoy < fLlegada) return `En ${Math.ceil((fLlegada - hoy) / (1000 * 60 * 60 * 24))} día(s)`
  return 'Finalizada'
}

function formatFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
}

function verDetalle(reserva) {
  alert(`Casita: ${reserva.casita}\nLlegada: ${reserva.llegada}\nSalida: ${reserva.salida}`)
}

function estadoClase(reserva) {
  if (reserva.cancelada) return 'cancelado'
  const hoy = new Date()
  const fLlegada = new Date(reserva.llegada)
  const fSalida = new Date(reserva.salida)
  if (hoy >= fLlegada && hoy <= fSalida) return 'en-curso'
  if (hoy < fLlegada) return 'proxima'
  return 'finalizada'
}

function verMas() {
  router.push('/reservaciones')  // Cambia la ruta según cómo se llame tu vista completa de reservaciones
}
</script>

<style scoped>
.header-row {
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
  margin-bottom: 8px;
  font-size: 14px;
}
.cancelado {
  color: #a94442;
}
.en-curso {
  color: #31708f;
}
.proxima {
  color: #3c763d;
}
.finalizada {
  color: #777;
}
ion-col {
  font-size: 13px;
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
