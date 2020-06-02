import notepadApi from '../api/notepad_api.js';
import util from '../utils/index.js';

export default class Notepad {
    /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
    #notes = [];
    #currentNote = {};

    get all() {
        return this.#notes;
    }
    get currentNote() {
        return this.#currentNote;
    }

    getNotes() {
        return notepadApi.getNotes()
            .then(data => {
                if (data.ok) {
                    this.#notes = data.item;
                }
            })
            .catch(err => console.log(err));
    }

    getNewNote() {
        const note = {
            title: 'New Title',
            description: 'No Description',
            updatedAt: util.getCurrentDate(),
        }
        return note;
    }

    setCurrentNote(id) {
        this.#currentNote = this.findCurrentNote(id);
    }

    findCurrentNote(id) {
        const result = this.#notes.find(el => {
            return el.id === Number(id);
        });
        return result;
    }

    checkModified(obj) {
        const isModified = this.#currentNote.title !== obj.title || this.#currentNote.description !== obj.description;
        return isModified;
    }

    saveCurrentNote(obj) {
        const modifiedNote = {
            title: obj.title,
            description: obj.description,
            id: this.#currentNote.id,
        };

        return notepadApi.updateNote(modifiedNote)
            .then(data => {
                if (data.ok) {
                    this.modifyCurrentNote(data.item);
                    return;
                } else {
                    alert(data.msg);
                }
            })
    }

    modifyCurrentNote(obj) {
        this.#currentNote.title = obj.title || this.#currentNote.title;
        this.#currentNote.description = obj.description || this.#currentNote.description;
        this.#currentNote.updatedAt = obj.updatedAt || this.#currentNote.updatedAt;
    }

    addNote(note) {
        return notepadApi.createNote(note)
        .then(data => {
            if (data.ok) {
                this.#notes.push(data.item);
                return data.item;
            } else {
                alert(data.msg);
            }
        })
    }

    deleteNote(id) {
        this.#notes.forEach((el, i) => {
            if (el.id === id) {
                this.#notes.splice(i, 1);
            }
        })
        notepadApi.deleteNote(id);
    }

    getUniqueId() {
        const id = util.getRandomId();
        return this.checkDuplicatedId(id) ? this.getUniqueId() : id;
    }

    checkDuplicatedId(id) {
        if (!this.#notes) return false;
        const result = this.#notes.some(el => {
            return el.id === id;
        });
        return result;
    }

    sortNotes() {
        this.#notes.sort((a, b) => {
            const firstValue = a.updatedAt.replace(/[^0-9]/g,"");
            const secondValue = b.updatedAt.replace(/[^0-9]/g,"");
            return firstValue - secondValue;
        });
    }
};
