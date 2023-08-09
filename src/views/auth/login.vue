<template>
  <div id="LoginForm">
    <div class="wrap" >
      <div class="login">
        <h2>Login</h2>
<!--&lt;!&ndash;                <div class="login_sns">&ndash;&gt;-->
<!--&lt;!&ndash;                  <li><a href=""><i class="fab fa-instagram"></i></a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <li><a href=""><i class="fab fa-facebook-f"></i></a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <li><a href=""><i class="fab fa-twitter"></i></a></li>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
        <div class="login_id">
          <h4>아이디</h4>
          <input type="text" v-model="email" name="memberId" id="email" ref="email"
                 placeholder="아이디를 입력해주세요">
        </div>
        <div class="login_pw">
          <h4>비밀번호</h4>
          <input type="password" v-model="password" name="password" id="password" ref="password"
                 @keyup.enter="doLogin" placeholder="비밀번호를 입력해주세요">
        </div>
        <div class="login_etc">
          <div class="checkbox">
            <input type="checkbox" name="" id="">로그인 상태 유지
          </div>
        </div>
        <div class="submit">
          <input type="submit" style="cursor:pointer;" value="로그인" @click="doLogin">
        </div>
        <div style="margin-top:10px" class="login_sub">
          <span style="margin-right:10px;" class="btn-fun" @click="doFindPw">
            <a>비밀번호 찾기</a>&nbsp; |
          </span>
          <span style="margin-right:10px;" class="btn-fun" @click="doFindId">
            <a>아이디 찾기</a> &nbsp; |
          </span>
          <span style="margin-right:10px;" class="btn-fun">
            <a @click="doJoin">회원가입</a>
          </span>
        </div>
        <div v-if="isLoading">
          <loading-spinner :isLoading="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingSpinner from "@/components/common/LoadingSpinner";
import api from "@/api/modules/autohrize";

export default {
  name: "loginPage",
  components: {
    loadingSpinner
  },
  data() {
    return {
      isLoading: false,
      email: "",
      password: ""
    };
  },
  methods: {
    doLogin() {
      try {
        this.isLoading = true;
       let response =  api.doLogin({
          email: this.email,
          password: this.password
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }

    },
    doJoin() {

    },
    doFindPw() {

    },
    doFindId() {

    }
  }
};
</script>

<style scoped>
#LoginForm{
  background: url(../../assets/bonobono.png)  no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Noto Sans KR", sans-serif;
}

a {
  text-decoration: none;
  color: black;
}

li {
  list-style: none;
}

.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}

.login {
  width: 30%;
  height: 600px;
  background: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  color: tomato;
  font-size: 2em;
}

.login_sns {
  padding: 20px;
  display: flex;
}

.login_sns li {
  padding: 0px 15px;
}

.login_sns a {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50px;
  background: white;
  font-size: 20px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4), -3px -3px 5px rgba(0, 0, 0, 0.1);
}

.login_id {
  margin-top: 20px;
  width: 80%;
}

.login_id input {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  padding: 0px 20px;
  border: 1px solid lightgray;
  outline: none;
}

.login_pw {
  margin-top: 20px;
  width: 80%;
}

.login_pw input {
  width: 100%;
  height: 50px;
  border-radius: 30px;
  margin-top: 10px;
  padding: 0px 20px;
  border: 1px solid lightgray;
  outline: none;
}

.login_etc {
  padding: 10px;
  width: 80%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

.submit {
  margin-top: 50px;
  width: 80%;
}

.submit input {
  width: 100%;
  height: 50px;
  border: 0;
  outline: none;
  border-radius: 40px;
  background: linear-gradient(to left, rgb(255, 77, 46), rgb(255, 155, 47));
  color: white;
  font-size: 1.2em;
  letter-spacing: 2px;
}

.login_sub > span > a, .login_sub > span {
  color: #888;
}

.btn-fun > a {
  cursor: pointer;
}

.btn-fun > a:hover {
  color: #0B4C5F;
}
</style>
