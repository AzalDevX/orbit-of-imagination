<template>
  <main class="projects-body">

    <SpecialTitle :title="'Repositories'"/>

    <article name="fade" class="repositories" v-if="user_repositories">
      <div class="repo-card-container" v-for="repo in user_repositories" :key="repo.id">
        <Card :repo="repo" />
      </div>
    </article>

    <PaginationControls />
  </main>
</template>

<script>
import Swal from 'sweetalert2'
import config from '@/config/config.js'
import { fetchUserRepositories } from '@/utils/fetchData'
import { getScreenResolution } from '@/utils/globals.js'
import Card from '@/components/Card.vue'
import SpecialTitle from '@/components/SpecialTitle.vue'
import PaginationControls from '@/components/PaginationControls.vue'

const style = document.documentElement.style;

export default {
  components: {
    Card,
    SpecialTitle,
    PaginationControls
  },
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
      computerScreen: config.computer.screen,
      screenResolution: getScreenResolution()
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
        confirmButtonColor: style.getPropertyValue('--color-tone-500'),
        cancelButtonColor: style.getPropertyValue('--color-tone-800'),
        confirmButtonText: 'Try again',
        cancelButtonText: 'Go back',
        color: style.getPropertyValue('--color-tone-900'),
        background: style.getPropertyValue('--color-tone-600') 
      }).then(res => {
        if(res.isConfirmed){
          location.reload();
        } else{
          this.$router.push('/');
        }
      })
    },
  },
  computed: {
  },
};
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Mobile */
@media screen and (max-width: 1024px) {
	.projects-body{
		justify-content: center;
	}
	.repositories{
		justify-content: center;
	}
	.special-title{
		display: none;
	}
}

  
/* Computer */
@media screen and (min-width: 1024px) {
	.projects-body{
		width: 80vw;
    display: flex;
    justify-content: center;
    user-select: none;
	}

	.repositories{
		justify-content: start;
		width: 50vw;
	}

	.h3-container{
		right: 0; 
	}

	.controls{
		bottom: 15vh;
    margin-top: 3rem;
	}
}

.repositories {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: 3rem;
}

  .projects-body {
	margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: start;
  }
  
  </style>