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
      <tr v-for="(item, index) in list" :key="index" class="table-row" style="cursor:pointer;">
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
    <div class="pagination">
      <button
        class="pagination-btn"
        :disabled="page === 0"
        @click="goToPage(0)"
      >
        &lt;&lt;
      </button>
      <button
        class="pagination-btn"
        :disabled="page === 0"
        @click="changePage(page - 1)"
      >
        &lt;
      </button>
      <span v-for="(subItem,subIndex) in generatePageLinks"
            class="page-info"
            :key="subIndex">
        <a style="cursor:pointer;" @click="goToPage(subItem.pageNum)" :class="{page_selected:page===subItem.pageNum}">{{ subItem.pageNum }}</a>
      </span>
      <button
        class="pagination-btn"
        :disabled="obj.last"
        @click="changePage(page + 1)"
      >
        &gt;
      </button>
      <button
        class="pagination-btn"
        :disabled="obj.last"
        @click="goToPage(obj.totalPages-1)"
      >
        &gt;&gt;
      </button>
    </div>
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
      params: {},
      obj: {}
    };
  },
  computed: {
    generatePageLinks() {
      const totalPages = this.obj.totalPages;
      const visiblePageCount = 10; // 보여줄 페이지 버튼 수
      const pageLinks = [];

      let startPage = Math.max(0, this.page - Math.floor(visiblePageCount / 2));
      let endPage = Math.min(totalPages - 1, startPage + visiblePageCount - 1);

      if (endPage - startPage + 1 < visiblePageCount) {
        startPage = Math.max(0, endPage - visiblePageCount + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(i);
      }

      return pageLinks.map((pageNum) => ({
        pageNum: pageNum,
        isActive: pageNum === this.page
      }));
    }
  },
  created() {
    this.getBoardList();
  },
  methods: {
    async getBoardList() {
      try {
        this.isLoading = true;
        this.params = {
          page: this.page,
          size: this.size
        };
        let { data } = await api.getBoardList(this.params);
        this.obj = data;
        let content = data.content;
        this.list = content.map((item) => ({
          ...item,
          createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")
        }));
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    async changePage(page) {
      this.page = page;
      await this.getBoardList();
    },
    goToPage(page) {
      if (page >= 0 && page <= this.obj.totalPages) {
        this.page = page;
        this.getBoardList();
      }
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

/* 페이지 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-btn {
  padding: 8px 12px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  cursor: pointer;
}

.page-info {
  font-size: 16px;
  margin: 0 10px;
}
.page_selected{
  text-decoration: underline;
}
</style>
