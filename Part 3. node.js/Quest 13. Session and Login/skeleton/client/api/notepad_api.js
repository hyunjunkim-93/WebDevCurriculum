import base from './index_api.js';

export default {
    getNotes() {
        return base('GET', '/notepad');
    },

    createNote(payload) {
        base('POST', '/notepad', payload)
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);
            })
    },

    updateNote(payload) {
        base('PUT', '/notepad', payload)
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);
            })
    },

    deleteNote(id) {
        base('DELETE', '/notepad', { id })
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);
            })
    },
};
