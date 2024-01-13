<template>   
  <div  @click="swalRepository()" class="repo-card-details">
    <div>
      <a>{{ repo.name }}</a>
      <p>
        <img src="@/assets/star.svg" alt="Star"> 
        {{ repo.stargazers_count }}
      </p>
    </div>
    <p>{{ repo.language }}</p>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

const style = document.documentElement.style;

export default {
  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    swalRepository() {
      const repo = this.repo;

      Swal.fire({
        icon: 'info',
        title: repo.name,
        text: repo.description,
        showCancelButton: true,
        confirmButtonColor: style.getPropertyValue('--color-tone-500'),
        confirmButtonText: 'Keep here',
        cancelButtonColor: style.getPropertyValue('--color-tone-700'),
        cancelButtonText: 'Watch more...',
        color: style.getPropertyValue('--color-tone-700'),
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
  }
};
</script>

<style scoped>
/* Mobile */
@media screen and (max-width: 1024px) {
	.repo-card-details{
		width: 60vw;
	}
}

/* Computer */
@media screen and (min-width: 1024px) {
	.repo-card-details{
		width: 20vw;
	}
}

.repo-card-details div{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.repo-card-details {
  align-items: flex-start;
  flex-direction: column;
  cursor:pointer !important;
	background-color: var(--color-tone-200);
	border-radius: 5px;
	padding: 16px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
	transition: .25s;
	height: 10vh;
}

.repo-card-details:hover {
  transform: scale(1.1);
}
  
  .repo-card-details a {
	font-size: 20px;
	font-weight: bold;
	color: inherit;
	text-decoration: none;
  }
  
  .repo-card-details p {
	margin: 10px 0;
  }
  
  .repo-card-details, .repo-card-details p {
	display: flex;
	justify-content: space-between;
  }
</style>