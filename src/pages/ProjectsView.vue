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
    
    <aside v-if="screenResolution > computerScreen" class="controls">
      <a @click="previousPage" :class="{ 'disabled-link': currentPage === 1 }"> &lt; </a>
      <h1> {{ this.currentPage }} </h1>
      <a @click="nextPage" :class="{ 'disabled-link': currentPage * itemsPerPage >= totalItems }"> > </a>
    </aside>

  </main>
</template>

<script>
import { fetchUserRepositories } from '@/utils/fetchData';
import { getScreenResolution } from '@/utils/globals.js';
import config from '@/config/config.js'
import Swal from 'sweetalert2';

const style = document.documentElement.style;

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
    swalRepository(repo) {
      Swal.fire({
        icon: 'info',
        title: repo.name,
        text: repo.description,
        showCancelButton: true,
        confirmButtonColor: style.getPropertyValue('--color-tone-500'),
        confirmButtonText: 'Keep here',
        cancelButtonColor: style.getPropertyValue('--color-tone-800'),
        cancelButtonText: 'Watch more...',
        color: style.getPropertyValue('--color-tone-900'),
        background: style.getPropertyValue('--color-tone-950')
      }).then(res => {
        if (!res.isConfirmed) {
          //Go to github
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Redirecting...',
            showConfirmButton: false,
            color: style.getPropertyValue('--color-tone-600'), //
            background: style.getPropertyValue('--color-tone-900'), //
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

<style>
/* Mobile */
@media screen and (max-width: 1024px) {
	.projects-body{
		justify-content: center;
	}
	.repositories{
		justify-content: center;
	}

	.repo-card{
		width: 60vw;
	}

	.special-title{
		display: none;
	}
}

  
/* Computer */
@media screen and (min-width: 1024px) {
	.projects-body{
		width: 80vw;
	}

	.repositories{
		justify-content: start;
		width: 50vw;
	}

	.repo-card{
		width: 20vw;
	}

	.h3-container{
		right: 0; 
	}

	.controls{
		bottom: 15vh;
	}
}

.repositories {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	gap: 3rem;
}

.repo-card {
	cursor:pointer !important;
	background-color: var(--color-tone-100);
	border-radius: 5px;
	padding: 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
	transition: .25s;
	height: 10vh;
}
  
.repo-card:hover {
	transform: scale(1.1);
	transition: .3s;
}
  
  .repo-card a {
	font-size: 20px;
	font-weight: bold;
	color: inherit;
	text-decoration: none;
  }
  
  .repo-card p {
	margin: 10px 0;
  }
  
  .repo-card-details, .repo-card-details p {
	display: flex;
	justify-content: space-between;
	align-items: center;
  }

  .repo-card-container:hover {
	background-color: rgba(255, 255, 255, 0.1);
  }

  .projects-body {
	margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: start;
  }
  
  .h3-container {
    position: absolute;
    top: 50%; 
    transform: translateY(-50%); 
    z-index: -1;
  }
  .special-title {
    color: var(--color-tone-950);
    transform: rotate(90deg);
    font-size: 7rem;
    text-shadow: 1px 3px 5px var(--color-tone-900);
	top: 0;
	left: 0;
  }

  .controls{
	display: flex;
	width: 20vw;
	flex-direction: row;
	justify-content: space-between;
	align-items: space-between;
	position: absolute;
  }

  .controls a{
	color: var(--color-tone-500);
	border: 3px solid var(--color-tone-500);
	font-size: 5rem;
	cursor: pointer;
	border-radius: 10px;
	padding: 1%;
  }

  .controls a.disabled-link {
	color: var(--color-tone-800);
	border: 3px solid var(--color-tone-800);
	text-decoration: none;
	user-select: none;
  }
  
  .controls a.disabled-link:hover {
	cursor: not-allowed !important;
	user-select: none;
  }

  .controls h1{
	font-size: 3rem;
	line-height: 1rem;
  }
  
  </style>