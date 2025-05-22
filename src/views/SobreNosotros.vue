<template>
  <ion-page>
    <ion-content class="ion-padding">

      <!-- Título principal -->
      <div class="text-center">
        <h3><strong>Provisional</strong></h3>
        <h3><strong>CASITAS EL SALITRAL</strong></h3>
        <p class="text-muted">
          A las afueras de La Paz, Baja California Sur ·
          <a href="#opiniones">Escribir una opinión</a>
        </p>
      </div>

      <!-- Grid de 3 columnas -->
      <ion-grid class="ion-padding-top">
        <ion-row>

          <!-- Preguntas Frecuentes -->
          <ion-col size="12" size-md="4">
            <h5><strong>Preguntas Frecuentes</strong></h5>
            <ion-accordion-group expand="inset">
              <ion-accordion
                v-for="(faq, index) in faqs"
                :key="index"
                :value="'faq' + index"
              >
                <ion-item slot="header" color="light">
                  <ion-label>{{ faq.pregunta }}</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  {{ faq.respuesta }}
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-col>

          <!-- Sobre Nosotros -->
          <ion-col size="12" size-md="4">
            <h5><strong>Sobre Casitas El Salitral</strong></h5>
            <p>
              Casitas El Salitral by Rotamundos ofrece experiencias auténticas en contacto con la naturaleza.
            </p>
            <p>
              Ubicados cerca de La Paz, nuestras casitas combinan confort y belleza natural. Queremos brindarte descanso, aventura y conexión en un entorno acogedor.
            </p>
            <p>
              Disfruta caminatas, observación de aves y noches estrelladas. Nuestro equipo está comprometido a ofrecerte un servicio cálido y personalizado.
            </p>
            <p><strong>¡Bienvenido a tu hogar en la naturaleza!</strong></p>
          </ion-col>

          <!-- Galería -->
          <ion-col size="12" size-md="4">
            <ion-img
              class="img-rounded shadow-md ion-margin-bottom"
              src="https://i.ibb.co/F4nP9p09/Whats-App-Image-2024-10-24-at-8-53-23-PM.jpg"
              alt="Casita El Salitral"
            />
            <ion-img
              class="img-rounded shadow-md"
              src="https://i.ibb.co/9kYy8JcB/Whats-App-Image-2024-10-24-at-8-53-21-PM.jpg"
              alt="Naturaleza El Salitral"
            />
          </ion-col>

        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonImg
} from '@ionic/vue'

const faqs = [
  {
    pregunta: '¿Dónde se encuentra Casitas El Salitral?',
    respuesta: 'Estamos a las afueras de La Paz, Baja California Sur. Puedes encontrar la dirección exacta en la sección "¿Cómo llegar?".'
  },
  {
    pregunta: '¿Necesito reservar con anticipación?',
    respuesta: 'Sí, es recomendable reservar antes para asegurar disponibilidad, especialmente en temporada alta.'
  },
  {
    pregunta: '¿Se aceptan mascotas?',
    respuesta: '¡Sí! Somos pet-friendly. Solo pedimos seguir las reglas básicas de convivencia.'
  },
  {
    pregunta: '¿Qué servicios incluyen las casitas?',
    respuesta: 'Cama cómoda, baño privado, áreas de descanso y acceso a zonas comunes. Algunas casitas tienen cocina o terraza.'
  },
  {
    pregunta: '¿Hay señal de internet o teléfono?',
    respuesta: 'Sí, en áreas comunes. Pero te invitamos a desconectarte y disfrutar del entorno.'
  },
  {
    pregunta: '¿Cómo puedo modificar o cancelar una reservación?',
    respuesta: 'Desde tu cuenta en el sitio web o por WhatsApp/correo electrónico.'
  },
  {
    pregunta: '¿Qué actividades puedo realizar en El Salitral?',
    respuesta: 'Senderismo, observación de aves, fotografía, noches estrelladas y más. Consulta la sección de actividades.'
  }
]
</script>

<style scoped>
.text-center {
  text-align: center;
  margin-bottom: 2rem;
}
.img-rounded {
  border-radius: 12px;
}
.shadow-md {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
</style>
