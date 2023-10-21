<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './styles/App.css'
</script>

<template>
      <nav class="menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
      </nav>

  <RouterView />
</template>

