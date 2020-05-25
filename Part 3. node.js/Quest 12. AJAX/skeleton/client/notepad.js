class Notepad {
  #notes = []
  #currentNote = {}
  #targetIndex

	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
  get notes() {
    return this.#notes
  }
  get currentNote() {
    return this.#currentNote
  }
  set notes(data) {
    this.#notes.push(data)
  }
  set currentNote(data) {
    this.#currentNote = data
  }

  addNote(note) {
    this.#currentNote = note
    this.#notes.unshift(note)
    this.addNoteAPI(note)
  }

  checkUpdateCondition() {
    this.#targetIndex = this.findTargetIndex(this.#currentNote.created)
    if (this.#notes[this.#targetIndex].title !== this.#currentNote.title
      || this.#notes[this.#targetIndex].description !== this.#currentNote.description) {
      return true
    } else {
      return false
    }
  }

  updateNote() {
    this.updateNoteAPI(this.#currentNote)
    this.#notes[this.#targetIndex] = this.#currentNote
    this.sortNotes()
  }

  findTargetIndex(target) {
    const targetNoteIndex = this.#notes.findIndex(el => {
      return el.created === target
    })
    return targetNoteIndex
  }

  getNotesAPI() {
    return fetch('http://localhost:8080/api/notepad')
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          this.#notes = data.item
          this.sortNotes()
        } else {
          console.log(data.msg)
        }
      })
  }

  sortNotes() {
    this.#notes.sort((a, b) => {
      const firstValue = a.modified.replace(/[^0-9]/g,"");
      const secondValue = b.modified.replace(/[^0-9]/g,"");
      return secondValue - firstValue
    })
  }

  addNoteAPI(data) {
    this.customFetch('POST', '/notepad', data)
    this.sortNotes()
  }

  updateNoteAPI(data) {
    this.customFetch('PUT', '/notepad', data)
  }

  deleteNoteAPI() {
    this.customFetch('DELETE', '/notepad', this.#currentNote.created)
  }

  async customFetch(type = '', route = '', data = {}) {
    const response = await fetch(`http://localhost:8080/api${route}`, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  getEmptyNote() {
    const note = {
      created: this.getCreated(),
      modified: this.getModified(),
      title: 'New Note',
      description: '',
    }
    return note
  }

  getCurrentDate() {
    const date = new Date()
    const dateTimeFormat
      = new Intl.DateTimeFormat
        ('en',
        { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: 'numeric' })
    const [
      { value: month },,{ value: day },,{ value: year },,{ value: hour },,{ value: minute },,{ value: second }
    ] = dateTimeFormat.formatToParts(date)
    return { year, month, day, hour, minute, second }
  }

  getCreated() {
    const { year, month, day, hour, minute, second } = this.getCurrentDate()
    return `${year}${month}${day}-${hour}${minute}${second}`
  }

  getModified() {
    const { year, month, day, hour, minute, second } = this.getCurrentDate()
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`
  }
}

class ViewNotepad {
  #title
  #description
  #date
  #notepadList
  #notepad
  #aside
  #newBtn
  #deleteBtn
  #currentEl

  constructor(notepad) {
    this.#notepadList = document.querySelector('.notepad-list')
    this.#title = document.querySelector('.notepad-title')
    this.#description = document.querySelector('.notepad-description')
    this.#date = document.querySelector('.notepad-date')
    this.#aside = document.querySelector('.notepad-aside')
    this.#newBtn = document.querySelector('.notepad-btn--new')
    this.#deleteBtn = document.querySelector('.notepad-btn--delete')
    this.#notepad = notepad
    this.render()
    this.addEvents()
  }

  focusRecentNote() {
    if (this.#notepadList.children[2]) {
      this.#notepadList.children[2].click()
      this.#description.focus()
    }
  }

  render() {
    this.#notepad.getNotesAPI().then(() => {
      this.#notepad.notes.forEach(note => {
        this.setNoteLi(note)
      })
      this.focusRecentNote()
    })
  }

  updateView() {
    this.#notepadList.removeChild(this.#currentEl)
    const { li, title, date } = this.cloneLiTemplate()
    const modifiedNote = this.#notepad.notes[0]
    const firstNoteEl = this.#notepadList.children[2]
    this.setNoteLiContent(modifiedNote, title, date)
    this.addNoteLoadEvent(li, modifiedNote)
    this.#notepadList.insertBefore(li, firstNoteEl)
  }

  setNoteLi(note) {
    const { li, title, date } = this.cloneLiTemplate()
    this.setNoteLiContent(note, title, date)
    this.appendNoteLi(li)
    this.addNoteLoadEvent(li, note)
  }

  setNoteLiContent(note, title, date) {
    title.innerHTML = note.title
    date.innerHTML = note.modified
    this.#date.innerHTML = note.modified
  }

  appendNoteLi(li) {
    this.#notepadList.appendChild(li)
  }

  addNoteLoadEvent(el, content) {
    el.addEventListener('click', e => {
      this.#notepad.currentNote = { ...content }
      this.#date.innerHTML = this.#notepad.currentNote.modified
      this.#title.value = this.#notepad.currentNote.title
      this.#description.value = this.#notepad.currentNote.description
      this.#currentEl = e.currentTarget
    })
  }

  addEvents() {
    this.addNoteUpdateEvent()
    this.addNewNoteEvent()
    this.deleteNoteEvent()
  }

  addEmptyNote() {
    const emptyNote = this.#notepad.getEmptyNote()
    this.#notepad.addNote(emptyNote)
    this.setNoteLi(emptyNote)
    this.focusRecentNote()
  }

  cloneLiTemplate() {
    const template = document.querySelector('#template-notepad-list').content.cloneNode(true)
    const li = template.querySelector('.notepad-li')
    const title = li.querySelector('.li-title')
    const date = li.querySelector('.li-date')
    return { li, title, date }
  }

  addNoteUpdateEvent() {
    this.#aside.addEventListener('click', () => {
      const data = {
        title: this.#title.value,
        description: this.#description.value,
        modified: this.#notepad.getModified(),
      }
      this.#notepad.currentNote = Object.assign(this.#notepad.currentNote, data)
      if (this.#notepad.checkUpdateCondition()) {
        this.#notepad.updateNote()
        this.updateView()
      }
    })
  }

  addNewNoteEvent() {
    this.#newBtn.addEventListener('click', () => {
      this.addEmptyNote()
    })
  }

  deleteNoteEvent() {
    this.#deleteBtn.addEventListener('click', () => {
      this.#notepadList.removeChild(this.#currentEl)
      this.#notepad.deleteNoteAPI()
    })
  }
}
