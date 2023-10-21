<template>
  <!-- <div class="user-card">
    <div class="user-info" v-if="userInformation">
      <header class="header-card">
        <img :src="userInformation.avatar_url" alt="Avatar" class="avatar" />
        <div>
          <h2>{{ userInformation.name }}</h2>
          <p>Seguidores: {{ userInformation.followers }}</p>
        </div>
      </header>
		  <p class="bio" v-if="userInformation.bio">{{ userInformation.bio }}</p>
      <p v-else>No bio yet</p>
		  <p>Public repos: {{ userInformation.public_repos }}</p>
      <p>Company: {{ userInformation.company }}</p>
      <p>{{ userInformation.location }}</p>
    </div>
	</div> -->
  <div class="home-view">
    <img :src="userInformation.avatar_url" alt="Avatar" class="avatar" />
    <span>I'm 
      <strong>
        {{userInformation.name}}
      </strong>
    </span>
    <p class="bio" v-if="userInformation.bio">{{ userInformation.bio }}</p>
    <p class="bio-error" v-else>No bio yet</p>
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