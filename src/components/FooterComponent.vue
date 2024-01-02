<template>
    <footer class="footer-body">
      <aside>
        <p>
          Simple VUE portfolio template, 
          that will automatically sync
          with 
          your github public data 
          and show the information in here
        </p>
      </aside>
      <article>
        <span>© 2023 | Designed with 🪐 by</span>
        <a :href="github_link" target="_blank"> AzalDev</a>
      </article>
    </footer>
</template>  
  
<script>  
  export default {
    created() {},
    data() {
      return { 
        github_link: 'https://github.com/AzalDevX',
      };
    },
    methods: {}
  };
</script>

<style scoped>
/* Mobile */
@media screen and (max-width: 1024px) {
  .footer-body{
    padding-top: 1%;
    position: sticky;
    padding: 0 1rem;
    flex-direction: column;
    justify-content: space-evenly;
    padding-bottom: 1vh;
    width: auto;
  }
}

/* Computer */
@media screen and (min-width: 1024px) {
    .footer-body{
      font-size: .8rem;
      position: absolute;
      justify-content: space-around;
      flex-direction: row;
      width: 100vw;
    }
}

.footer-body {
    background-color: rgba(255, 255, 255, 0.1);
    bottom: 0;
    border-radius: 15px 15px 0 0;
    display: flex;
    align-items: center;
    font-size: .6rem;
}

.footer-body article{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .4rem;
}

.footer-body a{
    color: var(--color-tone-700);
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: .25rem;
}

.footer-body a:hover{
    color: var(--color-tone-400);
    text-decoration: underline;
}

.footer-body img{
    color: white;
    width: 50%;
}


</style>