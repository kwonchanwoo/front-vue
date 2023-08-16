import Vue from "vue";
import Vuex from "vuex";
import login from "@/store/module/login";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    login,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      //주목! : 여기에 쓴 모듈만 저장됩니다.
      paths: ["login"],
    }),
  ],
});

export default store;
