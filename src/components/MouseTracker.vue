<template>
  <div>
    <div
      id="circle"
      class="custom-circle"
      :style="{ transform: `translate(${position.x - 20}px, ${position.y - 20}px)`, opacity: isMouseInside ? '1' : '0' }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: { x: 0, y: 0 },
      isMouseInside: false,
      easingFactor: 0.1
    };
  },
  mounted() {
    this.startMouseTracking();
  },
  beforeDestroy() {
    this.stopMouseTracking();
  },
  methods: {
    handleMouseMove(e) {
      setTimeout(() => {
        this.position = { x: e.clientX, y: e.clientY };
      }, 100);
    },
    handleMouseEnter() {
      this.isMouseInside = true;
    },
    handleMouseLeave() {
      this.isMouseInside = false;
    },
    startMouseTracking() {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseenter', this.handleMouseEnter);
      document.addEventListener('mouseleave', this.handleMouseLeave);
    },
    stopMouseTracking() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseenter', this.handleMouseEnter);
      document.removeEventListener('mouseleave', this.handleMouseLeave);
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
  transition: opacity 0.25s ease;
}
</style>
