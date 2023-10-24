<template>
  <h3>Repositorios de {{ capitalizeFirstLetter(username) }}</h3>
  <div class="repositories" v-if="user_repositories">
    <div class="repo-card-container" v-for="repo in user_repositories" :key="repo.id">
      <div class="repo-card">
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        <p>{{ repo.description }}</p>
        <div class="repo-card-details">
          <p>Language: {{ repo.language }}</p>
          <p>Stars: {{ repo.stargazers_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config/config.js'
import '../styles/ProjectsView.css'
import axios from 'axios'


export default {
  created() {
    this.fetchDataFromAPI();
  },
  data() {
    return {
      username: config.gh.account,
      user_repositories: null
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const repositoriesRequest = await axios.get(`https://api.github.com/users/${this.username}/repos`);
        this.user_repositories = repositoriesRequest.data;
        console.log(this.user_repositories);
      } catch (error) {
        console.error('Error al cargar datos desde la API', error);
      }
    },
    capitalizeFirstLetter(string) {
      if (typeof string !== "string" || string.length === 0) {
        return string; // Devuelve la cadena original si no es una cadena válida
      }
      return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    }
  },
  computed: {
  },
};
</script>