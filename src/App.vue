<script setup>
import Menu from './components/MenuComponent.vue'
import Footer from './components/FooterComponent.vue'
import MouseTracker from './components/MouseTracker.vue'
import './styles/App.css'
</script>

<template>
  <MouseTracker />
  <Menu />
  <RouterView />
  <Footer />
</template>

<!-- 
  README:
    Please, if you use this template, do not remove the footer to support me. 
  It has cost me my work, and you are very supportive. Thank you 💖🫶
  -->
