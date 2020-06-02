export default class ViewNotepad {
    #dateEl;
    #titleEl;
    #descriptionEl;

    constructor() {
        this.#dateEl = document.querySelector('.notepad-date');
        this.#titleEl = document.querySelector('.notepad-title');
        this.#descriptionEl = document.querySelector('.notepad-description');
    }

    reset() {
        this.#dateEl.innerHTML = '';
        this.#titleEl.value = '';
        this.#descriptionEl.value = '';
    }

    saveNoteEvent(callback) {
        this.#descriptionEl.addEventListener('focusout', callback);
        this.#titleEl.addEventListener('focusout', callback);
    }

    saveCurrentTabEvent(callback) {
        this.#descriptionEl.addEventListener('click', callback);
        this.#titleEl.addEventListener('click', callback);
    }

    getNoteValue() {
        const obj = {
            title: this.#titleEl.value,
            description: this.#descriptionEl.value,
        };
        return obj;
    }

    renderNotepad(obj) {
        this.#dateEl.innerHTML = obj.updatedAt;
        this.#titleEl.value = obj.title;
        this.#descriptionEl.value = obj.description;
    }

    focusCursor(targetClass) {
        const targetEl = document.querySelector(`.${targetClass}`);
        targetEl.focus();
    }
}
