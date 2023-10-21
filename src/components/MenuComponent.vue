<template>
    <nav class="menu">
        <h2>{{ config.web.name }}</h2>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
    </nav>
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
