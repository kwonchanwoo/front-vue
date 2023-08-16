import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dayjs from "dayjs";
import "dayjs/locale/ko";
Vue.config.productionTip = false;

dayjs.locale("ko");

//dayjs를 프로토타입으로 저장
Vue.prototype.$dayjs = dayjs;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
