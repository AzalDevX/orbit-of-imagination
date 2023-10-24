<template>
    <main class="abme-body">
      <article class="h1-container">
        <h1 class="special-title">About Me</h1>
    </article>
    <div class="abme-content" v-html="html_content"></div>
    <a id="more-button" :href="github_link" target="__blank">Wanna view more about me? Click me!</a>
    </main>
  </template>
  
  <script>
  import config from '../config/config';
  import '../styles/AboutView.css'
  import axios from 'axios';
  import { marked } from 'marked';
  
  export default{
    created() {
      this.fetchDataFromAPI();
    },
    data() {
      return {
        user_readme: null,
        github_link: `https://github.com/${config.gh.account}`
      };
    },
    methods: {
      async fetchDataFromAPI() {
        try {
          const informationRequest = await axios.get(
            `https://raw.githubusercontent.com/${config.gh.account}/${config.gh.account}/main/README.md`
          );
          this.user_readme = informationRequest.data;
        } catch (error) {
          console.error('Error al cargar datos desde la API', error);
        }
      },
    },
    computed: {
        html_content(){
            return marked(this.user_readme)
        }
    }
  };
  </script>
  