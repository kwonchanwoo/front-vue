import axiosInstance from "@/api/proxyHandler";

export default {
  //로그인
  async doLogin(form) {
    return await axiosInstance.post("authorize/login", {
      ...form,
    });
  },
  //회원가입
  async doJoin(form) {
    return await axiosInstance.post("/login/join", form);
  },
  //회원가입 -> Id 중복체크
  async duplChk(memberId) {
    return await axiosInstance.post("/login/duplChk", {
      memberId: memberId,
    });
  },
  //ID/비밀번호 인증번호 발급
  async certification(email) {
    return await axiosInstance.post("/certification/issuance", {
      address: email,
    });
  },
  //ID,비밀번호 조회
  async findId(param) {
    return await axiosInstance.post("/certification/findId", {
      ...param,
    });
  },
};
