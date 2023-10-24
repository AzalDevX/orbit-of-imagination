<template>
    <footer class="footer-body">
      <aside>
        <p>
          Simple VUE portfolio template, that will automatically 
          sync <br> with your github public data and show the 
          information in here
        </p>
      </aside>
      <article>
        <span>© 2023 | Designed with 🪐 by</span>
        <a :href="github_link" target="_blank"> AzalDev</a>
      </article>
    </footer>
</template>  
  
  <script>
  import '../styles/FooterComponent.css'
  
  export default {
    created() {},
    data() {
      return { github_link: 'https://github.com/LaloruHub' };
    }
  };
  </script>