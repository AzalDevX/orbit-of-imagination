<template>
    <nav class="menu">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/projects">Projects</RouterLink>
    </nav>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
</script>