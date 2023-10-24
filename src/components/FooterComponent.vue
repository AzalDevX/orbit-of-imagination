<template>
    <article class="footer-body">
      <a :href="github_link" target="_blank">Github<img src="../assets/icons/external-link.svg" alt="Github link"></a>
    </article>
</template>  
  
  <script>
  import config from '../config/config.js'
  import '../styles/FooterComponent.css'
  
  export default {
    created() {},
    data() {
      return { github_link: `https://github.com/${config.gh.account}` };
    },
    methods: {},
    computed: {},
  };
  </script>