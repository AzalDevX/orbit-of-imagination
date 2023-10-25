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

    <aside class="controls">
      <a @click="previousPage" :class="{ 'disabled-link': currentPage === 1 }"> &lt; </a>
      <h1> {{ this.currentPage }} </h1>
      <a @click="nextPage" :class="{ 'disabled-link': currentPage * itemsPerPage >= totalItems }"> > </a>
    </aside>

  </main>
</template>

<script>
import config from '../config/config.js'
import '../styles/ProjectsView.css'
import axios from 'axios'
import Swal from 'sweetalert2';


export default {
  created() {
    this.fetchDataFromAPI();
  },
  data() {
    return {
      username: config.gh.account,
      user_repositories: [],
      currentPage: 1,
      itemsPerPage: config.gh.repos_per_page,
      totalItems: 0,
    };
  },
  methods: {
    async fetchDataFromAPI() {
  try {
    const page = this.currentPage;
    const perPage = this.itemsPerPage;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const url = `https://api.github.com/users/${this.username}/repos?page=${page}&per_page=${perPage}`;
    const repositoriesRequest = await axios.get(url);

    this.user_repositories = repositoriesRequest.data;
    const totalReposRequest = await axios.get(`https://api.github.com/users/${this.username}`);
    this.totalItems = totalReposRequest.data.public_repos; 
    
  } catch (error) {
    console.error('Error al cargar datos desde la API', error);
    this.swalError('It seems to be taking a while to load...');
  }
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
        confirmButtonColor: '#6493cd', //--steel-blue-500
        cancelButtonColor: '#364972', //--steel-blue-800
        confirmButtonText: 'Try again',
        cancelButtonText: 'Go back',
        color: '#364972', //--steel-blue-900
        background: '#4f7abf' //--steel-blue-600
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
        confirmButtonColor: '#6493cd', //--steel-blue-500
        confirmButtonText: 'Keep here',
        cancelButtonColor: '#364972', //--steel-blue-800
        cancelButtonText: 'Watch more...',
        color: '#364972', //--steel-blue-900
        background: '#4f7abf' //--steel-blue-600
      }).then(res => {
        if (res.isDismissed) {
          //Go to github
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Redirecting...',
            showConfirmButton: false,
            color: '#4f7abf', //--steel-blue-600
            background: '#364972', //--steel-blue-900
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