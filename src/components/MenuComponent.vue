<template>
  <header id="menu-content">

    <h2>{{ config.web.name }}</h2>

    <nav class="menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
    </nav>
  </header>
  
</template>

<script>
import config from '../config/config.js'
import { RouterLink } from 'vue-router'
import '../styles/MenuComponent.css'

export default {
  data() {
    return {
      config
    };
  }
};
</script>
