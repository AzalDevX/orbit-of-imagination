<template>
  <!-- <div class="user-card">
    <div class="user-info" v-if="user_information">
      <header class="header-card">
        <img :src="user_information.avatar_url" alt="Avatar" class="avatar" />
        <div>
          <h2>{{ user_information.name }}</h2>
          <p>Seguidores: {{ user_information.followers }}</p>
        </div>
      </header>
		  <p class="bio" v-if="user_information.bio">{{ user_information.bio }}</p>
      <p v-else>No bio yet</p>
		  <p>Public repos: {{ user_information.public_repos }}</p>
      <p>Company: {{ user_information.company }}</p>
      <p>{{ user_information.location }}</p>
    </div>
	</div> -->
  <div class="home-view">
    <img :src="user_information.avatar_url" alt="Avatar" class="avatar" />
    <span v-if="user_information.name" class="name">I'm 
      <strong>
        {{user_information.name}}
      </strong>
    </span>
    <span v-else class="name-error"><strong>No name yet</strong></span>
    <p class="bio" v-if="user_information.bio">{{ user_information.bio }}</p>
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
      user_information: null,
      title: config.web.name
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const informationRequest = await axios.get(`https://api.github.com/users/${config.gh.account}`); 
        this.user_information = informationRequest.data;
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