<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Cabañas Disponibles</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-grid class="ion-padding">
    <!-- Comentarios -->
    <ion-row>
      <ion-col size="12" size-md="4">
        <ion-text color="dark">
          <h4 class="fw-bold">Comentarios</h4>
        </ion-text>
        <ion-list>
          <ion-item v-for="(comentario, index) in comentarios" :key="index" lines="none">
            <ion-avatar slot="start">
              <ion-img :src="comentario.foto"></ion-img>
            </ion-avatar>
            <ion-label>
              <strong>{{ comentario.nombre }}</strong>
              <div class="text-warning stars">
                <ion-icon
                  v-for="n in 5"
                  :key="n"
                  :icon="n <= comentario.estrellas ? 'star' : 'star-outline'"
                ></ion-icon>
              </div>
              <p><small><em>Sobre: {{ comentario.cabana }}</em></small></p>
              <p>{{ comentario.mensaje }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-col>

      <!-- Cabañas -->
      <ion-col size="12" size-md="8">
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-sm="6" size-md="4" v-for="(cabana, index) in cabanas" :key="index">
              <ion-card button @click="$router.push(`/detail/${cabana.id}`)" class="cabana-card">
                <div class="img-container">
                  <ion-img :src="cabana.img" :alt="'Imagen de ' + cabana.nombre"></ion-img>
                </div>
                <ion-card-header>
                  <ion-card-title>{{ cabana.nombre }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-text color="medium">
                    <p>{{ cabana.descripcion }}</p>
                  </ion-text>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>
    <Footer />
  </ion-grid>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const cabanas = ref([])
const comentarios = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/cabins')

    // Primero carga las cabañas
    cabanas.value = res.data.map(cabana => ({
      id: cabana.id,
      nombre: cabana.name,
      descripcion: cabana.description,
      img: cabana.images?.[0]?.url || 'https://i.ibb.co/sv7MR8xV/Whats-App-Image-2025-06-27-at-1-37-05-AM-2.jpg'
    }))

    // Después, por cada cabaña, pide los comentarios de su detalle
    for (const cabana of cabanas.value) {
      try {
        const detalle = await axios.get(`http://127.0.0.1:8000/api/cabins/${cabana.id}`)
        
        const listaComentarios = (detalle.data.reviwes || detalle.data.reviews || []).map(com => ({
          nombre: com.fisrt_name || 'Anónimo',
          estrellas: com.rating,
          mensaje: com.comment,
          fecha: com.date,
          foto: com.foto || 'https://i.ibb.co/PcgYQnv/avatar-default.png',
          cabana: cabana.nombre
        }))

        comentarios.value.push(...listaComentarios)

      } catch (err) {
        console.warn(`No se pudieron cargar comentarios de ${cabana.nombre}`, err)
      }
    }

  } catch (err) {
    console.error('Error al obtener cabañas', err)
  }
})
</script>



<style scoped>
.img-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  cursor: pointer;
}
ion-img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
}
.cabana-card:hover ion-img {
  transform: scale(1.2);
  filter: brightness(0.8);
}
.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.cabana-card:hover .overlay-text {
  opacity: 1;
}
.stars ion-icon {
  font-size: 1.1rem;
  color: #ffc107;
}
ion-avatar {
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
}

ion-avatar ion-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
