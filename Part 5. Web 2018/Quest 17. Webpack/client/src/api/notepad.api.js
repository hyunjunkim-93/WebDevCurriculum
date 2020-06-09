import customAxios from './index.js';

function getTypeCheckForm(data) {
    return {
        ok: data.ok,
        msg: data.msg,
        item: data.item || '',
        type: data.type || '',
        path: data.path || '',
    };
}

export default {
    addNote(noteInfo) {
        return customAxios.post(`/notepad/new`, noteInfo)
            .then(response => {
                const { data } = response;
                return getTypeCheckForm(data);
            })
    },
    getNotes() {
        return customAxios.get(`/notepad/all`)
            .then(response => {
                const { data } = response;
                return getTypeCheckForm(data);
            })
    },
    updateNote(noteInfo) {
        return customAxios.put(`/notepad/update`, noteInfo)
            .then(response => {
                const { data } = response;
                return getTypeCheckForm(data);
            })
    },
    deleteNote(id) {
        return customAxios.delete(`/notepad/delete`, { data: { id } })
            .then(response => {
                const { data } = response;
                return getTypeCheckForm(data); 
            })
    },
};
