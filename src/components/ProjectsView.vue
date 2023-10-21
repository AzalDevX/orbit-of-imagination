<template>
	<div class="repositories" v-if="userRepositories">
		<h3>Repositorios de {{ capitalizeFirstLetter(username) }}</h3>
		<div v-for="repo in userRepositories" :key="repo.id" class="repo-card">
		  <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
		  <p>{{ repo.description }}</p>
      <p>Lenguaje: {{ repo.language }}</p>
      <p>Estrellas: {{ repo.stargazers_count }}</p>
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
      userRepositories: null
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const repositoriesRequest = await axios.get(`https://api.github.com/users/${this.username}/repos`);
        this.userRepositories = repositoriesRequest.data;
        console.log(this.userRepositories);
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