<template>    
    <header class="h3-container">
        <h3 class="special-title">{{ this.title }}</h3>
    </header>
</template>

<script>
export default{
    props: {
        title: {
            type: String,
            required: true,
        },
    },
}
</script>

<style>
/* Mobile */
@media screen and (max-width: 1024px) {
	.special-title{
		display: none;
	}
}
  
/* Computer */
@media screen and (min-width: 1024px) {  
	.h3-container{
		right: 0; 
	}
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
</style>