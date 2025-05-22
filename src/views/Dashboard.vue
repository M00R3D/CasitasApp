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
          <IonCol><strong>Estado</strong></IonCol>
          <IonCol><strong>Nombre de Casita</strong></IonCol>
          <IonCol><strong>Costo (MXN)</strong></IonCol>
          <IonCol><strong>Llegada</strong></IonCol>
          <IonCol><strong>Salida</strong></IonCol>
          <IonCol><strong>Acciones</strong></IonCol>
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
            <IonButton fill="clear" @click="verDetalle(reserva)">
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
  IonIcon,
} from '@ionic/vue'

import { ref } from 'vue'
import { eyeOutline } from 'ionicons/icons'

const reservaciones = ref([
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
])

function calcularEstado(llegada, salida, cancelada) {
  if (cancelada) return 'Cancelada'

  const hoy = new Date()
  const fLlegada = new Date(llegada)
  const fSalida = new Date(salida)

  if (hoy >= fLlegada && hoy <= fSalida) return 'En curso'
  if (hoy < fLlegada) {
    const dias = Math.ceil((fLlegada - hoy) / (1000 * 60 * 60 * 24))
    return `Dentro de ${dias} día(s)`
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
  alert(`Detalle de la reservación:\nCasita: ${reserva.casita}\nLlegada: ${reserva.llegada}\nSalida: ${reserva.salida}`)
}

function estadoClase(reserva) {
  if (reserva.cancelada) return 'estado-cancelado'

  const hoy = new Date()
  const fLlegada = new Date(reserva.llegada)
  const fSalida = new Date(reserva.salida)

  if (hoy >= fLlegada && hoy <= fSalida) return 'estado-en-curso'
  if (hoy < fLlegada) return 'estado-proxima'

  return 'estado-finalizada'
}
</script>

<style scoped>
.estado-en-curso {
  color: #007bff;
  font-weight: bold;
}

.estado-proxima {
  color: #28a745;
  font-weight: bold;
}

.estado-finalizada {
  color: #6c757d;
  font-weight: bold;
}

.estado-cancelado {
  color: #dc3545;
  font-weight: bold;
}

.header-row {
  background: #f2f2f2;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
}
</style>
