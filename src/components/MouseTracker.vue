<template>
    <div>
      <div
        id="circle"
        class="custom-circle"
        :style="{ transform: `translate(${position.x - 20}px, ${position.y - 20}px)` }"
      ></div>
    </div>
</template>
  
<script>

    export default {
      data() {
        return {
          position: { x: 0, y: 0 },
        };
      },
      mounted() {
        this.startMouseTracking();
      },
      methods: {
          handleMouseMove(e) {
            setTimeout(() => {
              this.position = { x: e.clientX, y: e.clientY };
            }, 100);
          },
          startMouseTracking() {
            
                document.addEventListener('mousemove', this.handleMouseMove);
           
          },
      },
    };
</script>
  
  <style scoped>
.custom-circle {
    width: 40px;
    height: 40px;
    border: 2px solid;
    border-radius: 50%;
    position: absolute;
    pointer-events: none;
    z-index: 9999;
}
  </style>
  