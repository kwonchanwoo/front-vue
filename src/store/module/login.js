//state
const state = {
    token: '',
    userId : '',
}

// mutations
const mutations = {
    setToken: (state, payload) => {
        state.token = payload.token
    },
    setUserId: (state,payload) => {
        state.userId = payload.userId
    },
}

// actions
const actions = {
}

// getters
const getters = {
    getLoginToken(state){
        return state.token
    },
    getUserId(state){
        return state.userId
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}