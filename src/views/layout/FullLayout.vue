<template>
  <div id="full-div">
    <slot />
  </div>
</template>

<script>
export default {
  name: "FullScreenLayout",
};
</script>

<style scoped>
#full-div {
  height: 100%;
}
</style>
