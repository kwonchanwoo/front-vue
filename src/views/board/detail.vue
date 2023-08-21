<template>
  <div class="board-detail">
    <h1 class="mb-4">게시판 등록</h1>
    <form>
      <div class="form-group">
        <div><span @click="$router.push({name:'boardList'})" style="float:right; cursor:pointer;">목록으로</span></div>
        <label for="title">제목</label>
        <input v-model="model.title" type="text" id="title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="contents">내용</label>
        <textarea v-model="model.contents" id="contents" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="boardCategory">카테고리</label>
        <select v-model="model.boardCategory" id="boardCategory" class="form-control">
          <option value="BASIC">기본</option>
          <option value="NOTICE">공지</option>
          <option value="EVENT">이벤트</option>
        </select>
      </div>
      <button @click="postBoard" type="button">등록</button>
      <button @click="reset" type="button" >취소</button>
    </form>
    <LoadingSpinner :is-loading="isLoading" />
  </div>
</template>

<script>
import api from "@/api/modules/board"
import LoadingSpinner from "@/components/common/LoadingSpinner";
export default {
  name: "boardDetail",
  components: { LoadingSpinner },
  data() {
    return {
      isLoading:false,
      email:'',
      model: {
        title: "",
        contents: "",
        boardCategory: "BASIC"
      }
      //Todo: 게시판 댓글 추가해야함
    };
  },
  created(){
    if(this.$route.query.id){
      this.getBoardDetail(this.$route.query.id)
    }
  },
  methods: {
    async getBoardDetail(id){
      try{
        this.isLoading=true;
        let {data:{title,contents,boardCategory,email}} = await api.getBoardDetail(id);
        this.email = email;
        this.model = {
          title:title,
          contents:contents,
          boardCategory:boardCategory
        }
      }catch(e){
        console.log(e);
      }finally {
        this.isLoading=false;
      }
    },
    async postBoard() {
      if(!confirm(this.$route.params.id?"정말 수정 하시겠 습니까?":"정말 등록 하시겠 습니까?")){
        return false;
      }

      try{
        this.isLoading=true;
        if(this.$route.query.id){
          await api.patchBoard(this.$route.query.id,this.model)
        }else {
          await api.postBoard(this.model);
        }

        alert("등록 하였 습니다.");
        await this.$router.push({name:'boardList'})
      }catch(e){
        if(this.$route.params.id){
          alert("수정을 실패 하였 습니다.")
        }else{
          alert("등록을 실패 하였 습니다.")
        }
      }finally {
        this.isLoading=false;
      }
    },
    reset(){
      if(this.$route.query.id){
        this.getBoardDetail(this.$route.query.id)
      }else{
        this.model={
          title:'',
          contents:'',
          boardCategory:'BASIC'
        }
      }
    }
  }
};
</script>

<style scoped>
/* Bootstrap을 활용한 스타일링 */
.board-detail {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}
.form-control{
  width: 100%;
  height: 6.25em;
  resize: none;
}


</style>
