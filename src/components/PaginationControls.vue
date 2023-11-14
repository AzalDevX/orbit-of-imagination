<template>
     <aside v-if="screenResolution > computerScreen" class="controls">
      <a @click="previousPage" :class="{ 'disabled-link': currentPage === 1 }"> &lt; </a>
      <h1> {{ this.currentPage }} </h1>
      <a @click="nextPage" :class="{ 'disabled-link': currentPage * itemsPerPage >= totalItems }"> > </a>
    </aside>
</template>

<script>
import { getScreenResolution } from '@/utils/globals.js';
import config from '@/config/config.js'

export default {
	data() {
    	return {
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
  }
}
</script>

<style>
/* Computer */
@media screen and (min-width: 1024px) {
	.controls{
		bottom: 15vh;
    margin-top: 3rem;
	}
}

.controls{
	display: flex;
	width: 20vw;
	flex-direction: row;
	justify-content: space-between;
	align-items: space-between;
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