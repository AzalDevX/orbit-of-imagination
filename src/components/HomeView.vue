<template>
  <div class="user-card">
    <div class="user-info" v-if="userInformation">
      <h1>{{ title }}</h1>
      <header class="header-card">
        <img :src="userInformation.avatar_url" alt="Avatar" class="avatar" />
        <div>
          <h2>{{ userInformation.name }}</h2>
          <p>Seguidores: {{ userInformation.followers }}</p>
        </div>
      </header>
		  <p>{{ userInformation.bio }}</p>
		  <p>Repositorios públicos: {{ userInformation.public_repos }}</p>
      <p>Company: {{ userInformation.company }}</p>
      <p v-if="userInformation.bio">Bio: {{ userInformation.bio }}</p>
      <p v-else>No bio yet</p>
      <p>{{ userInformation.location }}</p>
    </div>
	</div>
  </template>  

<script>
import config from '../config/config.js'
import '../styles/HomeView.css'
import axios from 'axios'

export default {
  created() {
    this.fetchDataFromAPI();
  },
  data() {
    return {
      userInformation: null,
      title: config.web.name
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const informationRequest = await axios.get(`https://api.github.com/users/${config.gh.account}`); 
        this.userInformation = informationRequest.data;
        console.clear();
        console.log(this.userInformation);
      } catch (error) {
        console.error('Error al cargar datos desde la API', error);
      }
    }
  },
  computed: {

  },
};
</script>