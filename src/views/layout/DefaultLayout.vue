<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import FullLayout from "@/views/layout/FullLayout";
import MainLayout from "@/views/layout/MainLayout";
export default {
  name: "DefaultLayout",
  components: {
    FullLayout,
    MainLayout,
  },
  props: {
    layout: {
      type: String,
      default: "FullLayout",
    },
  },
};
</script>

<style scoped></style>
