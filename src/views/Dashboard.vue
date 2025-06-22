<!-- src/views/Dashboard.vue -->
<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Tus Reservaciones</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <IonGrid>
        <IonRow class="header-row">
          <IonCol>Estado</IonCol>
          <IonCol>Casita</IonCol>
          <IonCol>Costo</IonCol>
          <IonCol>Llegada</IonCol>
          <IonCol>Salida</IonCol>
          <IonCol>Detalle</IonCol>
        </IonRow>

        <IonRow v-for="(reserva, index) in reservaciones" :key="index">
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
    </IonContent>
  </IonPage>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { eyeOutline } from 'ionicons/icons'

// Estado reactivo para reservaciones
const reservaciones = ref([])

// Simular fetch desde un endpoint
function fetchReservaciones() {
  // Aquí podrías reemplazar por una llamada real a una API (ej. axios)
  reservaciones.value = [
    {
      casita: 'Casita del Mar',
      costo: 3500,
      llegada: '2025-06-01',
      salida: '2025-06-03',
      cancelada: false,
    },
    {
      casita: 'Nido Naranja',
      costo: 4200,
      llegada: '2025-05-10',
      salida: '2025-05-12',
      cancelada: false,
    },
    {
      casita: 'Casa Sol',
      costo: 2800,
      llegada: '2025-04-15',
      salida: '2025-04-17',
      cancelada: true,
    },
  ]
}

onMounted(() => {
  fetchReservaciones()
})

function calcularEstado(llegada, salida, cancelada) {
  if (cancelada) return 'Cancelada'
  const hoy = new Date()
  const fLlegada = new Date(llegada)
  const fSalida = new Date(salida)

  if (hoy >= fLlegada && hoy <= fSalida) return 'En curso'
  if (hoy < fLlegada) {
    const dias = Math.ceil((fLlegada - hoy) / (1000 * 60 * 60 * 24))
    return `En ${dias} día(s)`
  }
  return 'Finalizada'
}

function formatFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
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
