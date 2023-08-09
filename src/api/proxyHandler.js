import axios from "axios";
import store from "@/store";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = store.getters.getAccessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
let isTokenRefreshing = false;
let refreshSubscribers = [];

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};
const flushSubscriber = () => {
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config: originalRequest,
      response: { status },
    } = error;
    if (status === 403) {
      await router.replace({ name: "Login" });
    } else if (status === 401) {
      let retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber(() => {
          resolve(axiosInstance(originalRequest));
        });
      });
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        try {
          const accessToken = await store.getters.getAccessToken;
          const refreshToken = await store.getters.getRefreshToken;
          let {
            data: { accessToken: newAccessToken },
          } = await axiosInstance.post(
            `/authorize/refresh-token`, // token refresh api
            {
              refreshToken: refreshToken,
              accessToken: accessToken,
            }
          );
          await store.commit("setAccessToken", { accessToken: newAccessToken });
        } catch (e) {
          flushSubscriber();
          await router.replace({ name: "Login" });
        }
        isTokenRefreshing = false;
        onTokenRefreshed();
      }
      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;