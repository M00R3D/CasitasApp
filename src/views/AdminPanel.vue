<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>Panel de Administración</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding admin-content">
      
      <!-- Botón regresar estilo libre -->
      <ion-button class="flecha-regresar" @click="goBack">
        <ion-icon :icon="arrowBack" />
      </ion-button>

      <h2>Usuarios</h2>
      <ion-button @click="crearUsuario">Nuevo Usuario</ion-button>
      <ion-list>
        <ion-item v-for="u in usuarios" :key="u.id">
          <ion-label>
            <h3>{{ u.nombre }} {{ u.apellido }}</h3>
            <p>{{ u.correo }}</p>
          </ion-label>
          <ion-button color="warning" @click="editarUsuario(u)">Editar</ion-button>
          <ion-button color="danger" @click="eliminarUsuario(u.id)">Eliminar</ion-button>
        </ion-item>
      </ion-list>

      <h2>Cabañas</h2>
      <ion-button @click="crearCabana">Nueva Cabaña</ion-button>
      <ion-list>
        <ion-item v-for="c in cabanas" :key="c.id">
          <ion-label>
            <h3>{{ c.nombre }}</h3>
            <p>{{ c.precioPorNoche }} MXN/noche</p>
          </ion-label>
          <ion-button color="medium" @click="alternarOcupacion(c)">Ocupar/Desocupar</ion-button>
          <ion-button color="warning" @click="editarCabana(c)">Editar</ion-button>
          <ion-button color="danger" @click="eliminarCabana(c.id)">Eliminar</ion-button>
        </ion-item>
      </ion-list>

      <h2>Reservaciones</h2>
      <ion-list>
        <ion-item v-for="r in reservaciones" :key="r.id">
          <ion-label>
            <h3>Reserva: {{ r.id }}</h3>
            <p>Cliente: {{ r.usuarioId }} | Cabaña: {{ r.cabanaId }}</p>
            <p>Fechas: {{ r.llegada }} - {{ r.salida }}</p>
          </ion-label>
          <ion-button color="warning" @click="editarReservacion(r)">Editar</ion-button>
          <ion-button color="danger" @click="cancelarReservacion(r.id)">Cancelar</ion-button>
        </ion-item>
      </ion-list>

      <h2>Pagos</h2>
      <ion-button @click="crearPago">Nuevo Pago Manual</ion-button>
      <ion-list>
        <ion-item v-for="p in pagos" :key="p.id">
          <ion-label>
            <h3>Pago: {{ p.id }}</h3>
            <p>Usuario: {{ p.usuarioId }} | Monto: ${{ p.monto }}</p>
          </ion-label>
          <ion-button color="warning" @click="editarPago(p)">Editar</ion-button>
          <ion-button color="danger" @click="eliminarPago(p.id)">Eliminar</ion-button>
        </ion-item>
      </ion-list>

      <h2>Alertas</h2>
      <ion-button @click="crearAlerta">Nueva Alerta</ion-button>
      <ion-list>
        <ion-item v-for="a in alertas" :key="a.id">
          <ion-label>
            <h3>{{ a.titulo }}</h3>
            <p>{{ a.mensaje }}</p>
          </ion-label>
          <ion-button color="danger" @click="eliminarAlerta(a.id)">Eliminar</ion-button>
        </ion-item>
      </ion-list>

      <h2>Notificaciones</h2>
      <ion-button @click="crearNotificacion">Nueva Notificación</ion-button>
      <ion-list>
        <ion-item v-for="n in notificaciones" :key="n.id">
          <ion-label>
            <h3>{{ n.titulo }}</h3>
            <p>{{ n.mensaje }} | {{ n.tipo }}</p>
          </ion-label>
          <ion-button color="warning" @click="editarNotificacion(n)">Editar</ion-button>
          <ion-button color="danger" @click="eliminarNotificacion(n.id)">Eliminar</ion-button>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonButton, IonIcon
} from '@ionic/vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { arrowBack } from 'ionicons/icons'

const router = useRouter()

const usuarios = ref([{ id: 1, nombre: "Job", apellido: "Garay", correo: "job@mail.com" }])
const cabanas = ref([{ id: 1, nombre: "Cabaña Azul", precioPorNoche: 1500 }])
const reservaciones = ref([{ id: 1, usuarioId: 1, cabanaId: 1, llegada: "2025-07-01", salida: "2025-07-05" }])
const pagos = ref([{ id: 1, usuarioId: 1, monto: 4500 }])
const alertas = ref([{ id: 1, titulo: "Alarma de sistema", mensaje: "Error de servidor" }])
const notificaciones = ref([{ id: 1, titulo: "Reserva Confirmada", mensaje: "Tu reserva fue exitosa", tipo: "confirmacion" }])

function goBack() {
  router.back()
}

function crearUsuario() { alert("Crear usuario") }
function editarUsuario(u) { alert(`Editar usuario ${u.nombre}`) }
function eliminarUsuario(id) { usuarios.value = usuarios.value.filter(u => u.id !== id) }

function crearCabana() { alert("Crear cabaña") }
function editarCabana(c) { alert(`Editar cabaña ${c.nombre}`) }
function alternarOcupacion(c) { alert(`Alternar ocupación de ${c.nombre}`) }
function eliminarCabana(id) { cabanas.value = cabanas.value.filter(c => c.id !== id) }

function editarReservacion(r) { alert(`Editar reservación ${r.id}`) }
function cancelarReservacion(id) { reservaciones.value = reservaciones.value.filter(r => r.id !== id) }

function crearPago() { alert("Crear pago manual") }
function editarPago(p) { alert(`Editar pago ${p.id}`) }
function eliminarPago(id) { pagos.value = pagos.value.filter(p => p.id !== id) }

function crearAlerta() { alert("Crear alerta") }
function eliminarAlerta(id) { alertas.value = alertas.value.filter(a => a.id !== id) }

function crearNotificacion() { alert("Crear notificación") }
function editarNotificacion(n) { alert(`Editar notificación ${n.id}`) }
function eliminarNotificacion(id) { notificaciones.value = notificaciones.value.filter(n => n.id !== id) }
</script>

<style scoped>
h2 {
  margin-top: 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

ion-item {
  margin-bottom: 0.5rem;
}

.admin-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flecha-regresar {
  margin: 1rem 0;
}
</style>
