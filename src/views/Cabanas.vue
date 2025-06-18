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
                <ion-card button @click="$router.push('/detail')" class="cabana-card">
                  <div class="img-container">
                    <ion-img :src="cabana.img" :alt="'Imagen de ' + cabana.nombre"></ion-img>
                    <!-- <div class="overlay-text">Clic para reservar ya</div> -->
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
    </ion-grid>
</template>

<script setup>
import { IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList, IonItem, IonAvatar, IonLabel, IonIcon } from '@ionic/vue'
import { star, starOutline } from 'ionicons/icons'

const cabanas = [
  { nombre: "Cabaña 1", descripcion: "Una cabaña con vistas espectaculares.", img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg" },
  { nombre: "Cabaña 2", descripcion: "Relájate con el sonido del mar cercano.", img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg" },
  { nombre: "Cabaña 3", descripcion: "Perfecta para una escapada romántica.", img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg" },
  { nombre: "Cabaña 4", descripcion: "Ideal para familias grandes.", img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg" },
  { nombre: "Cabaña 5", descripcion: "Ambiente rústico y acogedor.", img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg" },
  { nombre: "Cabaña 6", descripcion: "Vista panorámica de la montaña.", img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg" },
  { nombre: "Cabaña 7", descripcion: "Tranquilidad y privacidad garantizadas.", img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg" },
  { nombre: "Cabaña 8", descripcion: "A pocos pasos del lago.", img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg" },
  { nombre: "Cabaña 9", descripcion: "Diseño moderno y elegante.", img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg" },
  { nombre: "Cabaña 10", descripcion: "Perfecta para escapadas de fin de semana.", img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg" },
  { nombre: "Cabaña 11", descripcion: "Ambiente cálido con chimenea.", img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg" },
  { nombre: "Cabaña 12", descripcion: "Ideal para amantes de la naturaleza.", img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg" },
]

const comentarios = [
  { nombre: "Laura Gómez", cabana: "Cabaña 1", estrellas: 5, mensaje: "Hermosa experiencia, muy recomendada.", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
  { nombre: "Carlos Díaz", cabana: "Cabaña 2", estrellas: 4, mensaje: "Todo muy bien, solo faltó café.", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { nombre: "Ana Torres", cabana: "Cabaña 3", estrellas: 3, mensaje: "Cómoda pero un poco calurosa.", foto: "https://randomuser.me/api/portraits/women/68.jpg" },
  { nombre: "Pedro Martínez", cabana: "Cabaña 1", estrellas: 4, mensaje: "Muy buen lugar, repetiría.", foto: "https://randomuser.me/api/portraits/men/75.jpg" },
  { nombre: "Sofía Ruiz", cabana: "Cabaña 5", estrellas: 5, mensaje: "Perfecto para desconectarse.", foto: "https://randomuser.me/api/portraits/women/22.jpg" },
]
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
</style>
