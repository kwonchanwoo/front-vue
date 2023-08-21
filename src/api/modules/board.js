import axiosInstance from "@/api/proxyHandler";

let prefix = "boards";
export default {
  // 게시판 목록
  async getBoardList(params) {
    return await axiosInstance.get(`${prefix}`, {
      params: {
        ...params,
      },
    });
  },
  // 게시판 상세
  async getBoardDetail(id) {
    return await axiosInstance.get(`${prefix}/${id}`);
  },
  // 게시판 등록
  async postBoard(body) {
    return await axiosInstance.post(`${prefix}`, {
      ...body,
    });
  },
  // 게시판 수정
  async patchBoard(id, body) {
    return await axiosInstance.patch(`${prefix}/${id}`, {
      ...body,
    });
  },
};
