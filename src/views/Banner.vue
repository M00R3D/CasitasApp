<template>
  <div class="banner">
    <img :src="imgSrc" alt="Banner" class="banner-img" />
    <div class="banner-overlay">
      <h2>{{ titulo }}</h2>
      <p>{{ subtitulo }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imgSrc: String,
  titulo: String,
  subtitulo: String,
})
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  margin: 2rem auto;
  margin-top: 40%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.banner-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  filter: brightness(0.7);
  display: block;
}

.banner-overlay {
  padding: 1.5rem;
  text-align: center;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.banner-overlay h2 {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.banner-overlay p {
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
}
</style>
