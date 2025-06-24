<!--src\views\ConfirmacionReserva.vue  -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Confirmar Reserva</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="cabana">
        <h2>{{ cabana.nombre }}</h2>
        <p><strong>Fecha de llegada:</strong> {{ llegada }}</p>
        <p><strong>Fecha de salida:</strong> {{ salida }}</p>
        <p><strong>Noches:</strong> {{ noches }}</p>
        <p><strong>Total a pagar:</strong> ${{ total.toFixed(2) }} MXN</p>

        <ion-button expand="block" color="success" @click="confirmar">
          Confirmar Reserva
        </ion-button>
        <ion-button expand="block" color="medium" @click="cancelar">
          Cancelar
        </ion-button>
      </div>
      <div v-else>
        <p>Cargando información...</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cabanas } from '../data/cabanas.js'

const route = useRoute()
const router = useRouter()

const cabana = ref(null)
const llegada = ref(route.query.llegada || '')
const salida = ref(route.query.salida || '')

onMounted(() => {
  const id = parseInt(route.params.id)
  cabana.value = cabanas.find(c => c.id === id)
})

const noches = computed(() => {
  if (!llegada.value || !salida.value) return 0
  const inicio = new Date(llegada.value)
  const fin = new Date(salida.value)
  const diffMs = fin - inicio
  const diffDias = diffMs / (1000 * 60 * 60 * 24)
  return diffDias > 0 ? diffDias : 0
})

const total = computed(() => {
  return cabana.value ? noches.value * cabana.value.precioPorNoche : 0
})

function confirmar() {
  alert(`Reserva confirmada para ${cabana.value.nombre} del ${llegada.value} al ${salida.value}`)
  router.push({ name: 'Home' }) // o a donde quieras redirigir
}

function cancelar() {
  router.push({ name: 'Home' }) // o a donde quieras redirigir
//   router.back()
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
