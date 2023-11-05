<template>
  <main class="projects-body">

    <header class="h3-container">
      <h3 class="special-title">Repositories</h3>
    </header>

    <article class="repositories" v-if="user_repositories">
      <div class="repo-card-container" v-for="repo in user_repositories" :key="repo.id">
        <div class="repo-card-wrapper">
          <div @click="swalRepository(repo)" class="repo-card">
            <div class="repo-card-details">
              <a>{{ repo.name }}</a>
              <p>
                <img src="../assets/star.svg" alt="Star"> 
                {{ repo.stargazers_count }}
              </p>
            </div>
            <p>{{ repo.language }}</p>
          </div>
        </div>
      </div>
    </article>
    
    <aside v-if="getScreenResolution > computerScreen" class="controls">
      <a @click="previousPage" :class="{ 'disabled-link': currentPage === 1 }"> &lt; </a>
      <h1> {{ this.currentPage }} </h1>
      <a @click="nextPage" :class="{ 'disabled-link': currentPage * itemsPerPage >= totalItems }"> > </a>
    </aside>

  </main>
</template>

<script>
import { getScreenResolution } from '@/utils/globals.js';
import { fetchUserRepositories } from '@/utils/fetchData';
import config from '@/config/config.js'
import '@/styles/ProjectsView.css'
import Swal from 'sweetalert2';


export default {
  created() {
    this.fetchDataFromAPI();
  },
  mounted(){
    window.addEventListener('resize', getScreenResolution);
  },
  data() {
    return {
      username: config.gh.account,
      user_repositories: [],
      currentPage: 1,
      itemsPerPage: config.gh.repos_per_page,
      totalItems: 0,
      computerScreen: config.computer.screen
    };
  },
  methods: {
    async fetchDataFromAPI() {
      const { user_repositories, totalItems } = await fetchUserRepositories(
        this.username,
        this.currentPage,
        this.itemsPerPage,
        this.computerScreen
      );

      this.user_repositories = user_repositories;
      this.totalItems = totalItems;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchDataFromAPI();
      }
    },
    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.totalItems) {
        this.currentPage++;
        this.fetchDataFromAPI();
      }
    },
    swalError(msg){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
        showCancelButton: true,
        confirmButtonColor: '#6493cd', //--color-tone-500
        cancelButtonColor: '#364972', //--color-tone-800
        confirmButtonText: 'Try again',
        cancelButtonText: 'Go back',
        color: '#364972', //--color-tone-900
        background: '#4f7abf' //--color-tone-600
      }).then(res => {
        if(res.isConfirmed){
          location.reload();
        } else{
          this.$router.push('/');
        }
      })
    },
    swalRepository(repo) {
      Swal.fire({
        icon: 'info',
        title: repo.name,
        text: repo.description,
        showCancelButton: true,
        confirmButtonColor: '#6493cd', //--color-tone-500
        confirmButtonText: 'Keep here',
        cancelButtonColor: '#364972', //--color-tone-800
        cancelButtonText: 'Watch more...',
        color: '#364972', //--color-tone-900
        background: '#4f7abf' //--color-tone-600
      }).then(res => {
        if (!res.isConfirmed) {
          //Go to github
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Redirecting...',
            showConfirmButton: false,
            color: '#4f7abf', //--color-tone-600
            background: '#364972', //--color-tone-900
            timer: 750
          }).then(() => {
            window.open(repo.html_url, '_blank');
          });
    }
  });
}
  },
  computed: {
  },
};
</script>