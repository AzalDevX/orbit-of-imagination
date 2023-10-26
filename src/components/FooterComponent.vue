<template>
    <footer class="footer-body">
      <aside>
        <p>
          Simple VUE portfolio template,<br v-if="getScreenResolution() < computerScreen"> 
          that will automatically sync <br v-if="getScreenResolution() > computerScreen"> 
          with <br v-if="getScreenResolution() < computerScreen">
          your github public data <br v-if="getScreenResolution() < computerScreen">
          and show the information in here
        </p>
      </aside>
      <article>
        <span>© 2023 | Designed with 🪐 by</span>
        <a :href="github_link" target="_blank"> AzalDev</a>
      </article>
    </footer>
</template>  
  
<script>
  import '../styles/FooterComponent.css'
  import config from '../config/config.js'
  
  export default {
    created() {},
    data() {
      return { 
        github_link: 'https://github.com/LaloruHub',
        computerScreen: config.computer.screen
      };
    },
    methods: {
      getScreenResolution() {
        return window.innerWidth;
      },
    }
  };
</script>