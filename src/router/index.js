import Vue from "vue";
import VueRouter from "vue-router";
import authRoutes from "@/router/modules/auth";

Vue.use(VueRouter);

const routes = [...authRoutes];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 0 },
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
