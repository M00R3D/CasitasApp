<template>
  
  <ion-page>
    
    <ion-content class="ion-padding como-llegar-content">
      <section class="header-section">
        <p>------------------------------</p>
        <ion-button class="flecha-regresar" @click="goBack">
          <ion-icon :icon="arrowBack" />
        </ion-button>
      </section>
      <section class="header-section">
        <h2>¿Cómo llegar a <span>Casitas El Salitral</span>?</h2>
        <p>Ubicados en las afueras de La Paz, Baja California Sur</p>
      </section>

      <section class="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.014512091949!2d-110.31800000000001!3d24.038000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86afb418d13123cd%3A0x6e44fbd287fa229!2sCasitas%20El%20Salitral!5e0!3m2!1ses-419!2smx!4v1684761234567!5m2!1ses-419!2smx"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section class="info-section">
        <p>
          Casitas El Salitral está a solo minutos de La Paz. Puedes llegar fácilmente en coche particular o solicitar servicio local. El camino incluye tramos rústicos pero pintorescos.
        </p>
        <p>
          Usa Google Maps o Waze para una mejor experiencia. Si lo prefieres, contáctanos por WhatsApp y te asistimos paso a paso.
        </p>
      </section>
      <Footer />
    </ion-content>
  </ion-page>

</template>

<script setup>
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import Footer from '../components/Footer.vue';
import { arrowBack } from 'ionicons/icons';
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.como-llegar-content {
  --background: #fdfdfd;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
}
.btn-regreso {
  margin-top: 302px; /* Ajusta el valor según cuánto lo quieras bajar */
}
.header-section {
  text-align: center;
  margin-top: 1rem;
  animation: fadeInDown 0.8s ease-in-out;
}

.header-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #34495e;
}

.header-section h2 span {
  color: #e67e22;
}

.header-section p {
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
}

.map-wrapper {
  width: 100%;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: zoomIn 0.6s ease;
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.info-section {
  padding: 0 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #2c3e50;
  animation: fadeInUp 0.8s ease-in-out;
}

@keyframes fadeInDown {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes zoomIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
