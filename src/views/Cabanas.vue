<!-- src\views\Cabanas.vue -->
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
      <Footer />
    </ion-grid>
    
</template>

<script setup>
import { IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonList, IonItem, IonAvatar, IonLabel, IonIcon } from '@ionic/vue'
import { star, starOutline } from 'ionicons/icons'
import Footer from '../components/Footer.vue'

//import { ref, onMounted } from 'vue'
//import axios from 'axios'
//
//const cabanas = ref([])
//const comentarios = ref([])
//
//onMounted(async () => {
//  try {
//    const res = await axios.get('https://tu-api.com/api/cabins')
//    cabanas.value = res.data.map(cabana => ({
//      id: cabana.id,
//      nombre: cabana.name,
//      descripcion: cabana.description,
//      img: cabana.images?.[0]?.url || 'https://via.placeholder.com/300x200',
//      // puedes mapear más campos si lo deseas
//    }))
//  } catch (err) {
//    console.error('Error al obtener cabañas', err)
//  }
//})

const cabanas = [
  {
    id: 1,
    nombre: "Cabaña Menta",
    descripcionBreve: "Cabaña acogedora con vista al bosque.",
    descripcionDetallada: "Disfruta de esta cabaña romántica rodeada de naturaleza, ideal para parejas.",
    precioPorNoche: 1895.99,
    capacidadMaxima: 2,
    fechaCreacion: "2024-01-10",
    activa: true,
    categoria: "Romántica",
    politica: "No se permiten mascotas.",
    tamanioM2: 35,
    img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg",
    comentarios: [
      { nombre: "Laura", estrellas: 5, mensaje: "Perfecto para parejas.", foto: "https://randomuser.me/api/portraits/women/44.jpg" },
      { nombre: "Carlos", estrellas: 4, mensaje: "Muy tranquila y acogedora.", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
    ],
  },
  {
    id: 2,
    nombre: "Cabaña Lago Azul",
    descripcionBreve: "Ubicada a orillas del lago.",
    descripcionDetallada: "Cabaña amplia con acceso privado al lago, ideal para familias.",
    precioPorNoche: 2295.50,
    capacidadMaxima: 4,
    fechaCreacion: "2023-08-05",
    activa: true,
    categoria: "Familiar",
    politica: "Prohibido fumar en el interior.",
    tamanioM2: 50,
    img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg",
    comentarios: [
      { nombre: "Ana", estrellas: 5, mensaje: "Increíble vista al lago.", foto: "https://randomuser.me/api/portraits/women/68.jpg" },
      { nombre: "Pedro", estrellas: 4, mensaje: "Ideal para descansar en familia.", foto: "https://randomuser.me/api/portraits/men/75.jpg" },
    ],
  },
  {
    id: 3,
    nombre: "Cabaña Montaña",
    descripcionBreve: "Ubicada en la cima con vistas espectaculares.",
    descripcionDetallada: "Perfecta para los amantes de la montaña, con chimenea y terraza panorámica.",
    precioPorNoche: 2599.00,
    capacidadMaxima: 3,
    fechaCreacion: "2024-02-15",
    activa: true,
    categoria: "Aventura",
    politica: "No se permiten niños menores de 12 años.",
    tamanioM2: 45,
    img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg",
    comentarios: [
      { nombre: "Lucía", estrellas: 5, mensaje: "Las mejores vistas que he tenido.", foto: "https://randomuser.me/api/portraits/women/50.jpg" },
    ],
  },
  {
    id: 4,
    nombre: "Cabaña Familiar Encino",
    descripcionBreve: "Espacio ideal para familias numerosas.",
    descripcionDetallada: "Cuenta con cocina completa, jardín privado y área de juegos.",
    precioPorNoche: 2890.75,
    capacidadMaxima: 6,
    fechaCreacion: "2022-11-20",
    activa: true,
    categoria: "Familiar",
    politica: "Se permiten mascotas pequeñas.",
    tamanioM2: 65,
    img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg",
    comentarios: [
      { nombre: "Daniel", estrellas: 4, mensaje: "Perfecta para los niños.", foto: "https://randomuser.me/api/portraits/men/90.jpg" },
    ],
  },
  {
    id: 5,
    nombre: "Cabaña Rústica Roble",
    descripcionBreve: "Estilo rústico y tradicional.",
    descripcionDetallada: "Decoración en madera, chimenea y ambiente cálido para desconectarse.",
    precioPorNoche: 1995.00,
    capacidadMaxima: 2,
    fechaCreacion: "2023-03-05",
    activa: false,
    categoria: "Rústica",
    politica: "Prohibido hacer fogatas exteriores.",
    tamanioM2: 40,
    img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg",
    comentarios: [
      { nombre: "Sofía", estrellas: 5, mensaje: "Me encantó su estilo acogedor.", foto: "https://randomuser.me/api/portraits/women/22.jpg" },
    ],
  },
  {
    id: 6,
    nombre: "Cabaña Vista Panorámica",
    descripcionBreve: "Vistas espectaculares de la montaña y el mar.",
    descripcionDetallada: "Cuenta con terraza de cristal y jacuzzi exterior.",
    precioPorNoche: 3199.99,
    capacidadMaxima: 4,
    fechaCreacion: "2024-04-12",
    activa: true,
    categoria: "Premium",
    politica: "Solo adultos mayores de 18 años.",
    tamanioM2: 70,
    img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg",
    comentarios: [
      { nombre: "Andrés", estrellas: 5, mensaje: "Una experiencia de lujo.", foto: "https://randomuser.me/api/portraits/men/80.jpg" },
    ],
  },
  {
    id: 7,
    nombre: "Cabaña Privada Sauce",
    descripcionBreve: "Privacidad garantizada en un entorno natural.",
    descripcionDetallada: "Alejada de otras cabañas, ideal para relajarse y desconectarse.",
    precioPorNoche: 2090.00,
    capacidadMaxima: 2,
    fechaCreacion: "2023-07-18",
    activa: true,
    categoria: "Romántica",
    politica: "No se permiten visitas externas.",
    tamanioM2: 38,
    img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg",
    comentarios: [
      { nombre: "Brenda", estrellas: 4, mensaje: "Muy tranquila, rodeada de árboles.", foto: "https://randomuser.me/api/portraits/women/88.jpg" },
    ],
  },
  {
    id: 8,
    nombre: "Cabaña Lago Escondido",
    descripcionBreve: "Acceso privado a un lago oculto.",
    descripcionDetallada: "Para los aventureros que buscan explorar y disfrutar de la naturaleza.",
    precioPorNoche: 2499.50,
    capacidadMaxima: 3,
    fechaCreacion: "2022-09-30",
    activa: true,
    categoria: "Aventura",
    politica: "Se recomienda traer repelente.",
    tamanioM2: 48,
    img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg",
    comentarios: [
      { nombre: "Miguel", estrellas: 5, mensaje: "El lago es un paraíso escondido.", foto: "https://randomuser.me/api/portraits/men/45.jpg" },
    ],
  },
  {
    id: 9,
    nombre: "Cabaña Moderna Cedro",
    descripcionBreve: "Diseño minimalista y elegante.",
    descripcionDetallada: "Cuenta con acabados de lujo, sistema domótico y grandes ventanales.",
    precioPorNoche: 2799.99,
    capacidadMaxima: 4,
    fechaCreacion: "2024-05-01",
    activa: true,
    categoria: "Premium",
    politica: "Solo mayores de 21 años.",
    tamanioM2: 55,
    img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg",
    comentarios: [
      { nombre: "Karen", estrellas: 5, mensaje: "Moderna y muy cómoda.", foto: "https://randomuser.me/api/portraits/women/40.jpg" },
    ],
  },
  {
    id: 10,
    nombre: "Cabaña Escapada Express",
    descripcionBreve: "Perfecta para estancias cortas de fin de semana.",
    descripcionDetallada: "Compacta, funcional y rodeada de naturaleza.",
    precioPorNoche: 1795.00,
    capacidadMaxima: 2,
    fechaCreacion: "2023-02-14",
    activa: true,
    categoria: "Económica",
    politica: "Estadía máxima de 3 noches.",
    tamanioM2: 30,
    img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg",
    comentarios: [
      { nombre: "Luis", estrellas: 4, mensaje: "Ideal para un fin de semana.", foto: "https://randomuser.me/api/portraits/men/35.jpg" },
    ],
  },
  {
    id: 11,
    nombre: "Cabaña Chimenea Nogal",
    descripcionBreve: "Ambiente cálido con chimenea tradicional.",
    descripcionDetallada: "Perfecta para noches frías, cuenta con decoración en madera natural.",
    precioPorNoche: 2150.25,
    capacidadMaxima: 3,
    fechaCreacion: "2023-12-10",
    activa: false,
    categoria: "Rústica",
    politica: "No se permite cocinar dentro de la habitación.",
    tamanioM2: 42,
    img: "https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg",
    comentarios: [
      { nombre: "Valeria", estrellas: 5, mensaje: "Muy acogedora, excelente para invierno.", foto: "https://randomuser.me/api/portraits/women/99.jpg" },
    ],
  },
  {
    id: 12,
    nombre: "Cabaña Naturaleza Viva",
    descripcionBreve: "Ideal para amantes de la naturaleza.",
    descripcionDetallada: "Rodeada de vegetación, perfecta para quienes buscan paz y contacto natural.",
    precioPorNoche: 2050.00,
    capacidadMaxima: 2,
    fechaCreacion: "2023-06-25",
    activa: true,
    categoria: "Ecológica",
    politica: "Respetar flora y fauna local.",
    tamanioM2: 36,
    img: "https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg",
    comentarios: [
      { nombre: "Diego", estrellas: 5, mensaje: "Conexión total con la naturaleza.", foto: "https://randomuser.me/api/portraits/men/20.jpg" },
    ],
  },
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
