<template>
  <main class="projects-body">
    <aside class="h3-container">
      <h3 class="special-title">Repositories</h3>
    </aside>
    <div class="repositories" v-if="user_repositories">
      <div class="repo-card-container" v-for="repo in user_repositories" :key="repo.id">
        <div @click="swalRepository(repo)" class="repo-card">
          <div class="repo-card-details">
            <a >{{ repo.name }}</a>
            <p>Stars: {{ repo.stargazers_count }}</p>
        </div>
        <p>Language: {{ repo.language }}</p>
        </div>
      </div>
    </div>
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
      user_repositories: null
    };
  },
  methods: {
    async fetchDataFromAPI() {
      try {
        const repositoriesRequest = await axios.get(`https://api.github.com/users/${this.username}/repos`);
        this.user_repositories = repositoriesRequest.data.filter(repo => repo.name.toLowerCase() != config.gh.account.toLowerCase());
        console.log(this.user_repositories);
      } catch (error) {
        console.error('Error al cargar datos desde la API', error);
        this.swalError('It seems to be taking a while to load...')
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
        if (!res.isConfirmed) {
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