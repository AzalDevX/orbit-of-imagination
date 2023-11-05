<template>
    <footer class="footer-body">
      <aside>
        <p>
          Simple VUE portfolio template,<br v-if="getScreenResolution < computerScreen"> 
          that will automatically sync <br v-if="getScreenResolution > computerScreen"> 
          with <br v-if="getScreenResolution < computerScreen">
          your github public data <br v-if="getScreenResolution < computerScreen">
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
  import { getScreenResolution } from '@/utils/globals.js';
  import config from '@/config/config.js'
  
  export default {
    created() {},
    data() {
      return { 
        github_link: 'https://github.com/AzalDevX',
        computerScreen: config.computer.screen
      };
    },
    methods: {}
  };
</script>

<style>
/* Mobile */
@media screen and (max-width: 1024px) {
    .footer-body{
        padding-top: 1%;
        position: sticky;
        justify-content: space-evenly;
        box-shadow: 0 -50px 80px rgba(255, 255, 255, 0.1);
    }
}

/* Computer */
@media screen and (min-width: 1024px) {
    .footer-body{
        font-size: .8rem;
        position: absolute;
        justify-content: space-around;
    }
}

.footer-body {
    background-color: rgba(255, 255, 255, 0.1);
    bottom: 0;
    width: 100vw;
    border-radius: 15px 15px 0 0;
    display: flex;
    flex-direction: row;
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