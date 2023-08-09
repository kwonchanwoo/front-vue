<template>
  <loading
      :active="isLoading"
      :lock-scroll="lockScroll"
      :loader="loader"
      :color="'#cfcfcf'"/>
</template>
<script>
// Loading-Spinner github 참고하세요! -> https://github.com/ankurk91/vue-loading-overlay/tree/v3.x
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
// import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "LoadingSpinner",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    fullPage: {
      type: Boolean,
      default: true,
    },
    loader: {
      type: String,
      default: "dots",
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loading,
  },
};
</script>
<style scoped>
.vld-shown {
  overflow: hidden;
}

.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
}

.vld-overlay.is-active {
  display: flex;
}

.vld-overlay.is-full-page {
  z-index: 9999;
  position: fixed;
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
}

.vld-overlay .vld-icon, .vld-parent {
  position: relative;
}


</style>
