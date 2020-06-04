import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.store.js';
import notepad from './modules/notepad.store.js';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user,
        notepad,
    },
    strict: debug,
});
