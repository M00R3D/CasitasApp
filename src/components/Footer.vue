<template>
  <ion-footer class="footer-wrapper">
    <ion-toolbar class="toolbar-content">
      
      <div class="footer-content">

        <!-- Logo -->
        <a href="#"><img src="https://i.ibb.co/Tq7v2SD/path1584.png" alt="Logo" class="logo-icon" /></a>

        <!-- Íconos Redes -->
        <div class="icons">
          <a href="#"><img src="https://i.ibb.co/2YRBG2kk/igicon.png" alt="Instagram" class="small-icon" /></a>
          <a href="#"><img src="https://i.ibb.co/FLbvPqPH/fbicon.png" alt="Facebook" class="small-icon" /></a>
          <a href="#"><img src="https://i.ibb.co/rRDFsCTK/wpicon.png" alt="WhatsApp" class="small-icon" /></a>
        </div>

        <!-- Derechos -->
        <span class="rights">© 2024</span>

      </div>

    </ion-toolbar>
  </ion-footer>
</template>

<script setup>
import { IonFooter, IonToolbar } from '@ionic/vue'
</script>

<style scoped>
.footer-wrapper {
  background-color: #fff;
  border-top: 1px solid #dee2e6;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  width: 100%;
}

.toolbar-content {
  padding: 10px 15px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.icons {
  display: flex;
  gap: 12px;
}

.small-icon {
  width: 18px;
  height: 18px;
}

.logo-icon {
  width: 38px;
  height: 38px;
}

.rights {
  font-size: 0.8rem;
  color: #666;
}
</style>
