<template>
    <main class="abme-body">
        <article class="h1-container">
            <h1>About Me</h1>
        </article>
        {{this.user_readme}}
    </main>
</template>

<script>
import config from '../config/config';
import '../styles/AboutView.css'

import axios from 'axios'

export default {
  created() {
    this.fetchDataFromAPI();
  },
  data() {
    return {
        user_readme: null,
      title: config.web.name
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const informationRequest = await axios.get(`https://raw.githubusercontent.com/${config.gh.account}/${config.gh.account}/main/README.md`); 
        this.user_readme = informationRequest.data;
        console.clear();
        console.log(this.user_information);
      } catch (error) {
        console.error('Error al cargar datos desde la API', error);
      }
    }
  },
  computed: {

  },
};
</script>