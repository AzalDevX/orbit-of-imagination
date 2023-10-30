<template>
    <main class="abme-body">
      <article class="h1-container">
        <h1 class="special-title">About Me</h1>
    </article>
    <div v-if="html_content" class="abme-content" v-html="html_content"></div>
    <div v-else>No content</div>
    <a v-if="getScreenResolution() > computerScreen" id="more-button" :href="github_link" target="__blank">Wanna view more about me? Click here!</a>
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
        github_link: `https://github.com/${config.gh.account}`,
        computerScreen: config.computer.screen
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
      getScreenResolution() {
        return window.innerWidth;
      },
    },
    computed: {
        html_content(){
          let res = '';
          try{
            res = marked(this.user_readme)
          }catch{
            res = undefined
          }
          return res
        }
    }
  };
  </script>
  