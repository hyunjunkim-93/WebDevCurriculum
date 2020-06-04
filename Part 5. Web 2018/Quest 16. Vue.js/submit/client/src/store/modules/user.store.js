import userAPI from '@/api/user.api.js';

const state = {
    userNickname: '',
    login: false,
};

const mutations = {
    SET_LOGIN_INFO(state, obj) {
        state.userNickname = obj.nickname;
        state.login = obj.login;
    },
};

const actions = {
    async fetchSignInApi({ commit }, info) {
        const { ok, item, msg } = await userAPI.signin(info);
        if (ok) {
            commit('SET_LOGIN_INFO', item);
        }
        return { ok, msg };
    },
    async fetchSignUpApi(_, info) {
        const { ok, msg } = await userAPI.signup(info);
        return { ok, msg };
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
