<template>
  <div class="home-view">
    <img :src="user_information.avatar_url" alt="Avatar" class="avatar" />
    <a v-if="user_information.name" class="name" :href="github_link" target="_blank">I'm 
      <strong>
        {{user_information.name}}
      </strong>
    </a>
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
      title: config.web.name,
      github_link: `https://github.com/${config.gh.account}`
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