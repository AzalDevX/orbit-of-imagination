<template>
  <header id="menu-content">
    <h2>{{ config.web.name }}</h2>
    <nav class="menu">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/projects">Projects</RouterLink>
      <button @click="toggleThemeAndImg">
        <img :src="imageSrc" alt="Moon">
      </button>
    </nav>
  </header>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import config from '@/config/config.js';
import useTheme from '@/config/useTheme';
import { RouterLink } from 'vue-router';

import moonImage from '@/assets/icons/moon.svg';
import sunImage from '@/assets/icons/sun.svg';

export default {
  setup() {
    const { toggleTheme, theme } = useTheme(); 
    const imageSrc = ref(moonImage);

    const toggleThemeAndImg = () => {
      toggleTheme();
      updateImageSrc();
    };

    const updateImageSrc = () => {
      imageSrc.value = toggleImg();
    };

    const toggleImg = () => {
      console.log(theme.value);
      return theme.value === 'light' ? sunImage : moonImage;
    };

    onBeforeMount(() => {
      updateImageSrc();
    });

    return {
      config: { ...config }, 
      imageSrc,
      toggleThemeAndImg,
    };
  },
};


</script>




<style>
/* Mobile */
@media screen and (max-width: 1024px) {
  #menu-content{
    position: sticky;
    z-index: 1;
    top: 0;
    flex-direction: column;
    background-color: var(--color-tone-950);
    box-shadow: 0 10px 80px var(--color-tone-950);
  }
  
  #menu-content h2{
    font-size: 1.8rem;
  }
  
  .menu{
    width: 99vw;
  }
}

/* Computer */
@media screen and (min-width: 1024px) {
  .menu {
    flex-direction: row;
    width: 50%;
    /* justify-content: space-evenly; */
    justify-content: center;
  }

  #menu-content{
    width: 100vw;
    justify-content: space-around;
  }

  #menu-content h2{
    font-size: 2.5rem;
  }
}

button{
  background-color: transparent;
  border: none;
}

button img{
  fill: red;
}

#menu-content{
  display: flex;
  align-items: center;
  padding: 1rem .5rem .5rem 1rem;
}

.menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

  }

  #menu-content h2{

    justify-self: self-start;
  }
  
  .menu a {
    font-size: 25px;
    position: relative;
    font-weight: lighter;
    text-decoration: none;
    color: var(--text-color);
    
  }
  
  .menu a::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    color: transparent;
    transition: color 0.3s ease;
  }
  
  .menu a:hover::before {
    color: var(--color-tone-700);
  }
  
  .menu a::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -3px;
    left: 0;
    background-image: linear-gradient(to right, var(--color-tone-400), var(--color-tone-950));
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform .3s ease;
}

  
  .menu a:hover::after {
    transform: scaleX(1);
  }
</style>
