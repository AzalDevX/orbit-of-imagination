<template>
    <main class="abme-body">
    <SpecialTitle :title="'About Me'"/>
    <div v-if="html_content" class="abme-content" v-html="html_content"></div>
    <div v-else>No content</div>
    <Button 
      v-if="screenResolution > computerScreen" 
      :link="'github_link'"
      :textToShow="'Wanna view more about me? Click here!'" 
    />
    </main>
  </template>
  
<script>
  import { getScreenResolution, convertMarkdownToHTML } from '@/utils/globals.js';
  import SpecialTitle from '../components/SpecialTitle.vue';
  import { fetchGitHubReadme } from '@/utils/fetchData';
  import config from '@/config/config';
  import Button from '../components/button.vue'
  
  export default{
    components: {
      SpecialTitle,
      Button
  },
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

<style>
/* Mobile */
@media screen and (max-width: 1024px) {
  .abme-content{
    max-width: 80vw;
  }

   .abme-content img{
    width: 50%;
  }

  .special-title {
    font-size: 7rem;
  }
}

/* Computer */
@media screen and (min-width: 1024px) {
  .abme-content {
    max-width: 60vw;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 12;
  }

  .abme-content img{
    width: 20%;
  }
  .special-title {
    font-size: 7rem;
  }
}

.abme-body {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .h1-container {
    position: absolute;
    top: 50%; 
    transform: translateY(-50%); 
    right: 0; 
    z-index: -1;
  }
  
  .special-title {
    color: var(--color-tone-950);
    transform: rotate(90deg);
    text-shadow: 1px 3px 5px var(--color-tone-600)
  }

  .abme-content {
    font-size: .9rem;
}


  .abme-content a{
    text-decoration: none;
    color: var(--color-tone-700);
  }

  .abme-content a:hover{
    text-decoration: underline;
    color: var(--color-tone-800);
  }

  #more-button{
    padding: 1%;
    margin: 2%;
    background-color: var(--color-tone-700);
    text-decoration: none;
    color: var(--color-tone-500);
    border-radius: 5px;
    transition: .2s;
  }

  #more-button:hover{
    background-color: var(--color-tone-600);
    color: var(--color-tone-300);
    border-radius: 10px;
    transition: .25s;
    transform: scale(1.05);
  }
</style>
  