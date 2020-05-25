export default class ViewNoteList {
    #deleteBtn;
    #addBtn;
    #noteListEl;
    #currentNoteLi;
    #newNoteLi;

    get currentNoteLi() {
        return this.#currentNoteLi;
    }

    constructor() {
        this.#deleteBtn = document.querySelector('.notepad-btn--delete');
        this.#addBtn = document.querySelector('.notepad-btn--add');
        this.#noteListEl = document.querySelector('.note-ul');
    }

    addNewNoteEvent(callback) {
        this.#addBtn.addEventListener('click', callback);
    }
    
    addDeleteNoteEvent(callback) {
        this.#deleteBtn.addEventListener('click', callback);
    }

    addSetNoteEvent(callback) {
        this.#newNoteLi.addEventListener('click', callback);
    }

    setCurrentNoteLi(targetEl) {
        this.#currentNoteLi = targetEl; 
    }

    resetNoteList() {
        while (this.#noteListEl.children.length !== 0) {
            this.#noteListEl.removeChild(this.#noteListEl.children[0]);
        }
    }

    deleteNoteLi() {
        if (this.#currentNoteLi) {
            this.#noteListEl.removeChild(this.#currentNoteLi);
            this.#currentNoteLi = '';
        }
    }

    renderNote() {
        if (this.#noteListEl.children.length == 0) {
            this.#noteListEl.appendChild(this.#newNoteLi);
        } else {
            const firstNoteEl = this.#noteListEl.children[0];
            this.#noteListEl.insertBefore(this.#newNoteLi, firstNoteEl);
        }
    }

    updateTab(note) {
        const title = this.#currentNoteLi.querySelector('.note-title');
        const date = this.#currentNoteLi.querySelector('.note-date');
        title.innerHTML = note.title;
        date.innerHTML = note.modified;
    }

    setNewNoteEl(obj) {
        const { li, title, date } = this.cloneLiTemplate();
        title.innerHTML = obj.title;
        date.innerHTML = obj.modified;
        li.id = obj.id;
        this.#newNoteLi = li;
    }
    
    clickTab(targetId) {
        const targetEl = document.getElementById(targetId);
        this.#currentNoteLi = targetEl;
        this.#currentNoteLi.click();
        this.activeTabColor();
    }

    cloneLiTemplate() {
        const template = document.querySelector('#template-note-li').content.cloneNode(true);
        const li = template.querySelector('.note-li');
        const title = li.querySelector('.note-title');
        const date = li.querySelector('.note-date');
        return { li, title, date };
    }

    activeTabColor() {
        for (const noteLi of this.#noteListEl.children) {
            this.#currentNoteLi === noteLi
                ? this.#currentNoteLi.classList.add('note-link--active')
                : noteLi.classList.remove('note-link--active');
        }
    }
}
