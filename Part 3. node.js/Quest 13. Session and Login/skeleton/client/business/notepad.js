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
            id: this.getUniqueId(),
            title: 'New Title',
            description: 'No Description',
            created: util.getCurrentDate(),
            modified: util.getCurrentDate(),
        }
        return note;
    }

    setCurrentNote(id) {
        this.#currentNote = this.findCurrentNote(id);
    }

    findCurrentNote(id) {
        const result = this.#notes.find(el => {
            return el.id === id;
        });
        return result;
    }

    saveCurrentNote(obj) {
        const isModified = this.#currentNote.title !== obj.title|| this.#currentNote.description !== obj.description;
        if (isModified) {
            this.modifyCurrentNote(obj);
            notepadApi.updateNote(this.#currentNote);
        } else {
            return;
        }
    }

    modifyCurrentNote(obj) {
        this.#currentNote.modified = util.getCurrentDate();
        this.#currentNote.title = obj.title || this.#currentNote.title;
        this.#currentNote.description = obj.description || this.#currentNote.description;
    }

    addNote(note) {
        this.#notes.push(note);
        notepadApi.createNote(note);
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
            const firstValue = a.modified.replace(/[^0-9]/g,"");
            const secondValue = b.modified.replace(/[^0-9]/g,"");
            return firstValue - secondValue;
        });
    }
};
