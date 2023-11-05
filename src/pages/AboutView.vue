<template>
    <main class="abme-body">
      <article class="h1-container">
        <h1 class="special-title">About Me</h1>
    </article>
    <div v-if="html_content" class="abme-content" v-html="html_content"></div>
    <div v-else>No content</div>
    <a v-if="screenResolution > computerScreen" id="more-button" :href="github_link" target="__blank">Wanna view more about me? Click here!</a>
    </main>
  </template>
  
  <script>
  import { getScreenResolution, convertMarkdownToHTML } from '@/utils/globals.js';
  import { fetchGitHubReadme } from '@/utils/fetchData';
  import config from '@/config/config';
  import '@/styles/AboutView.css'
  
  export default{
    created() {
      this.fetchDataFromAPI();
    },
    data() {
      return {
        user_readme: null,
        github_link: `https://github.com/${config.gh.account}`,
        computerScreen: config.computer.screen,
        html_content: null,
        screenResolution: getScreenResolution()
      };
    },
    methods: {
      async fetchDataFromAPI() {
        try {
          this.user_readme = await fetchGitHubReadme();
          this.html_content = convertMarkdownToHTML(this.user_readme);
        } catch (error) {
          console.error('Error al cargar datos desde la API', error);
        }
      },
    },
    computed: {}
  };
  </script>
  