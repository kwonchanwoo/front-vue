//state
const state = {
  accessToken: "",
  refreshToken: "",
  email: "",
};

// mutations
const mutations = {
  setAccessToken: (state, payload) => {
    state.accessToken = payload.accessToken;
  },
  setRefreshToken: (state, payload) => {
    state.refreshToken = payload.refreshToken;
  },
  setEmail: (state, payload) => {
    state.email = payload.email;
  },
};

// actions
const actions = {};

// getters
const getters = {
  getAccessToken(state) {
    return state.accessToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  getEmail(state) {
    return state.email;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
