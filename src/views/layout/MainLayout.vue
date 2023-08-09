<template>
  <div id="wrap">
    <MainHeader />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/common/MainHeader";

export default {
  name: "MainLayout",
  components: {
    MainHeader,
  },
};
</script>

<style scoped></style>
