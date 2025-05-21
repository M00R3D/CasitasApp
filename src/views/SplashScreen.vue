<!--src\views\SplashScreen.vue  -->
<template>
  <ion-page>
    <ion-content class="splash-container">
      <img
        src="https://i.ibb.co/Tq7v2SD/path1584.png"
        alt="Logo Casitas"
        class="splash-logo"
      />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push('/folder/Inbox') // o la ruta principal que tú uses
  }, 5000)
})
</script>

<style scoped>
.splash-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 100%;
}

.splash-logo {
  width: 200px;
  height: auto;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}
</style>
