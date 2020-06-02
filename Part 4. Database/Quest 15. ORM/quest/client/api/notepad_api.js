import base from './index_api.js';

export default {
    getNotes() {
        return base('GET', '/notepad/all');
    },

    createNote(payload) {
        return base('POST', '/notepad/new', payload)
            .then(data => data)
            .catch(err => {
                console.log(err);
            })
    },

    updateNote(payload) {
        return base('PUT', '/notepad/update', payload)
            .then(data => data)
            .catch(err => {
                console.log(err);
            })
    },

    deleteNote(id) {
        base('DELETE', '/notepad/delete', { id })
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);
            })
    },
};
