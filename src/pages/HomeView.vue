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
import { fetchGitHubUserInformation } from '@/utils/fetchData';
import config from '@/config/config.js'

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
        this.user_information = await fetchGitHubUserInformation();
      } catch (error) {
        console.error('Error al cargar datos desde la API', error);
      }
    }
  },
  computed: {

  },
};
</script>

<style>
/* Mobile */
@media screen and (max-width: 1024px) {

.name{
  font-size: 2rem;
  margin-top: 25vh;
}

.home-view{
  justify-content: start;
  overflow-y: hidden;
}

.home-view img{
  transform: translate(-50%, -50%) scale(.6);
  top: 25%;
  left: 50%;
}

.bio{
  font-size: 1rem;
  text-align: center;
  padding: 0 10%;
}
}

/* Computer */
@media screen and (min-width: 1024px) {
  .name{
    font-size: 7rem;
  }
  
  .home-view{
    justify-content: center;
  }
  
  .home-view img{
    transform: translate(-50%, -50%) scale(1.2);
    top: 40%;
    left: 50%;
  }
  
  .bio{
    font-size: 1.1rem;
  }
}

.home-view {
display: flex;
flex-direction: column;
align-items: center;
height: 100vh;
position: relative;
overflow: hidden !important;
}

.name {
background-image: linear-gradient(to bottom, var(--text-color), var(--color-tone-700));
-webkit-background-clip: text; 
background-clip: text;
color: transparent;
}

.name strong:hover{
background-image: linear-gradient(to bottom, var(--color-tone-500), var(--color-tone-700));
-webkit-background-clip: text; 
background-clip: text;
color: transparent;
}

.name-error{
font-size: 7.5rem;
font-weight: lighter;
color: red;
}

.home-view img {
position: absolute;

filter: grayscale(100%);

z-index: -1;
opacity: .3;

border-radius: 50%;
}

.bio {
font-weight: lighter;
text-shadow: .5px .5px 1px var(--color-tone-700);
}

.bio-error{
font-weight: lighter;
font-size: 1.1rem;
text-shadow: .5px .5px 1px rgba(255,255,255,.3);
color: red;
}
</style>