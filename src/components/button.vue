<template>
    <a  :href="link" target="__blank">{{textToShow}}</a>
</template>

<script>
export default {
  props: {
    link: String,
    textToShow: String
  }
};
</script>

<style scoped>

a{
    padding: 1%;
    margin: 2%;
    background-color: var(--color-tone-700);
    text-decoration: none;
    color: var(--color-tone-500);
    border-radius: 5px;
    transition: .2s;
  }

  a:hover{
    background-color: var(--color-tone-600);
    color: var(--color-tone-300);
    border-radius: 10px;
    transition: .25s;
    transform: scale(1.05);
  }</style>