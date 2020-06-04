import notepadAPI from '@/api/notepad.api.js';

const state = {
    notes: [],
};

const mutations = {
    ADD_NEW_NOTE(state, obj) {
        state.notes.push(obj);
    },
    SET_NOTES(state, arr) {
        state.notes = arr;
    },
    DELETE_NOTE(state, id) {
        const idx = state.notes.findIndex(el => (el.id === id));
        state.notes.splice(idx, 1);
    },
    UPDATE_NOTE(state, obj) {
        const idx = state.notes.findIndex(el => (el.id === obj.id));
        state.notes[idx] = obj;
    },
};

const actions = {
    async fetchNewNoteApi({ commit }, info) {
        if (!info.text) {
            return {
                msg: '내용을 입력해주세요',
                ok: 0,
            }
        }

        const { ok, item, msg, type, path } = await notepadAPI.addNote(info);
        if (type === 'redirect') {
            return { ok, msg, path };
        }
        if (ok) {
            commit('ADD_NEW_NOTE', item);
        }
        return { ok, msg };
    },
    async fetchGetNotesApi({ commit }) {
        const { ok, item, msg, type, path } = await notepadAPI.getNotes();
        if (type === 'redirect') {
            return { ok, msg, path };
        }
        if (ok) {
            commit('SET_NOTES', item);
        }
        return { ok, msg };
    },
    async fetchUpdateNoteApi({ commit }, noteInfo) {
        const { ok, item, msg, type, path } = await notepadAPI.updateNote(noteInfo);
        if (type === 'redirect') {
            return { ok, msg, path };
        }
        if (ok) {
            commit('UPDATE_NOTE', item);
        }
        return { ok, msg };
    },
    async fetchDeleteNoteApi({ commit }, id) {
        const { ok, msg, type, path } = await notepadAPI.deleteNote(id);
        if (type === 'redirect') {
            return { ok, msg, path };
        }
        if (ok) {
            commit('DELETE_NOTE', id);
        }
        return { ok, msg };
    },
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
