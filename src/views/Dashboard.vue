<!-- src/views/Dashboard.vue -->
<template>
  <div>
    <IonButton expand="block" color="primary" @click="abrirModal()">Nueva Reservación</IonButton>

    <IonGrid class="ion-margin-top">
      <IonRow class="header-row">
        <IonCol>Estado</IonCol>
        <IonCol>Casita</IonCol>
        <IonCol>Costo</IonCol>
        <IonCol>Llegada</IonCol>
        <IonCol>Salida</IonCol>
        <IonCol>Detalle</IonCol>
        <IonCol>Acciones</IonCol>
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
        <IonCol>
          <IonButton fill="clear" size="small" color="warning" @click="abrirModal(reserva, index)">
            Editar
          </IonButton>
          <IonButton fill="clear" size="small" color="danger" @click="eliminarReserva(index)">
            Borrar
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>

    <IonModal :is-open="mostrarModal" @didDismiss="cerrarModal">
      <!-- Tu contenido del modal aquí -->
    </IonModal>
  </div>
</template>


<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonModal,
  IonItem, IonLabel, IonInput, IonDatetime, IonDatetimeButton,
  IonToggle
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { eyeOutline } from 'ionicons/icons'
import axios from 'axios'



const reservaciones = ref([])
const mostrarModal = ref(false)
const editandoIndice = ref(null)

const formulario = ref({
  casita: '',
  costo: 0,
  llegada: '',
  salida: '',
  cancelada: false
})

function fetchReservaciones() {
  axios.get('http://localhost:8000/api/reservations') // Cambia la URL según tu IP y puerto de backend
    .then(response => {
      // Mapea los datos para que se adapten al frontend
      reservaciones.value = response.data.map(r => ({
        casita: r.cabin_id,  // Aquí puedes luego reemplazar cabin_id por el nombre si haces join o consultas cabin aparte
        costo: r.total,
        llegada: r.start_date,
        salida: r.end_date,
        cancelada: r.status.toLowerCase() === 'cancelada' // Ajusta según tu backend, aquí se asume que status es texto
      }))
    })
    .catch(error => {
      console.error('Error al obtener reservaciones:', error)
    })
}

onMounted(fetchReservaciones)

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

function abrirModal(reserva = null, index = null) {
  if (reserva) {
    formulario.value = { ...reserva }
    editandoIndice.value = index
  } else {
    formulario.value = { casita: '', costo: 0, llegada: '', salida: '', cancelada: false }
    editandoIndice.value = null
  }
  mostrarModal.value = true
}

function cerrarModal() {
  mostrarModal.value = false
}

function guardarReserva() {
  if (!formulario.value.casita || !formulario.value.llegada || !formulario.value.salida) {
    alert('Completa todos los campos obligatorios.')
    return
  }
  if (editandoIndice.value !== null) {
    reservaciones.value[editandoIndice.value] = { ...formulario.value }
  } else {
    reservaciones.value.push({ ...formulario.value })
  }
  cerrarModal()
}

function eliminarReserva(index) {
  if (confirm('¿Seguro que deseas eliminar esta reservación?')) {
    reservaciones.value.splice(index, 1)
  }
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
