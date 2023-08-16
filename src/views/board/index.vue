<template>
  <div class="board-list">
    <table class="table">
      <thead>
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>등록일</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in list" :key="index" class="table-row">
        <td class="title-cell">
          <span class="title">{{ item.title }}</span>
          <span class="comment-count">[{{ item.commentCount }}]</span>
        </td>
        <td>{{ item.contents }}</td>
        <td>{{ item.createdMember.name }}</td>
        <td>{{ item.createdAt }}</td>
      </tr>
      </tbody>
    </table>
    <LoadingSpinner :is-loading="isLoading" />
  </div>
</template>

<script>
import api from "@/api/modules/board";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import dayjs from "dayjs";

export default {
  name: "boardList",
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      list: [],
      page: 0,
      size: 10,
      params: {}
    };
  },
  async created() {
    try {
      this.isLoading = true;
      this.params = {
        page: this.page,
        size: this.size
      };
      let { data: { content } } = await api.getBoardList(this.params);
      this.list = content.map((item) => ({
        ...item,
        createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
      }));
      console.log(this.list);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.board-list {
  max-width: 800px;
  margin: 0 auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.table-row:hover {
  background-color: #f0f0f0; /* 부드러운 회색 */
}

.title-cell {
  display: flex;
  align-items: center;
}

.title {
  font-weight: bold;
  color: #333;
}

.comment-count {
  margin-left: 4px;
  color: #5383e8;
}
</style>
