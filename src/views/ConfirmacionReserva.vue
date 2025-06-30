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
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const cabana = ref(null)
const llegada = ref(route.query.llegada || '')
const salida = ref(route.query.salida || '')

const userId = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

onMounted(() => {
  const id = parseInt(route.params.id)
  fetchCabana(id)
})

async function fetchCabana(id) {
  try {
    const res = await axios.get(`http://localhost:8000/api/cabins/${id}`)
    cabana.value = res.data
  } catch (error) {
    console.error('Error al cargar cabaña:', error)
  }
}

const noches = computed(() => {
  if (!llegada.value || !salida.value) return 0
  const inicio = new Date(llegada.value)
  const fin = new Date(salida.value)
  const diffMs = fin - inicio
  const diffDias = diffMs / (1000 * 60 * 60 * 24)
  return diffDias > 0 ? Math.floor(diffDias) : 0
})

const total = computed(() => {
  return cabana.value ? noches.value * cabana.value.pricePerNight : 0
})

async function confirmar() {
  if (!userId || !cabana.value || !total.value) {
    alert('Faltan datos, verifica tu sesión o la información.')
    return
  }

  try {
    const reservaResp = await axios.post('http://localhost:8000/api/reservations', {
      verification_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      user_id: userId,
      cabin_id: cabana.value.id,
      start_date: llegada.value,
      end_date: salida.value,
      status: 'confirmed',
      total: total.value,
      notes: '',
      reminder_sent: false
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const reserva = reservaResp.data

    await axios.post('http://localhost:8000/api/payments', {
      reservation_id: reserva.id,
      payment_method: 'card',
      amount: total.value,
      currency: 'MXN',
      payment_type: 'final_payment',
      payment_status: 'paid',
      transaction_details: 'Pago online',
      payment_date: new Date().toISOString().split('T')[0]
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })

    alert('Reservación y pago registrados correctamente.')
    router.push({ name: 'Home' })

  } catch (error) {
    console.error('Error al confirmar:', error)
    alert('Ocurrió un error al confirmar la reserva.')
  }
}

function cancelar() {
  router.push({ name: 'Home' })
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
