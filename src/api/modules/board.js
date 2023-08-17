import axiosInstance from "@/api/proxyHandler";

export default {
  // 게시판 목록
  async getBoardList(params) {
    return await axiosInstance.get("boards", {
      params: {
        ...params,
      },
    });
  },
};
