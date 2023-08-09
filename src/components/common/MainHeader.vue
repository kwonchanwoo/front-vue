<template>
  <header id="main_header">
    <div class="hd_scBox">
      <input type="text"
             v-model.trim="search"
             placeholder="고객명, 전화번호로 검색하세요."
             @keyup.enter="searchCustomer"/>
    </div>
    <div class="hd_btnBox">
      <button @click="$router.go(0)" class="reset">새로고침</button>
      <button @click="$router.push({name: 'Home'}).catch(()=>{})" class="home">홈</button>
    </div>
  </header>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "MainHeader",
  computed: {
    search: {
      get() {
        return this.getSearch
      },
      set(newVal) {
        this.setSearch(newVal)
      }
    },
    ...mapGetters({
      getSearch: 'getSearch',
      isModalOpen: "getIsModalOpen"
    })
  },
  methods: {
    ...mapMutations(['setSearch']),
    searchCustomer() {
      this.$router.push({
        name: 'Customer'
      })
    },
  }
}
</script>

<style scoped>

</style>
