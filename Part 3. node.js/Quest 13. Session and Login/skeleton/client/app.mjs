import Notepad from './business/notepad.js';
import User from './business/user.js';
import ViewNotepad from './ui/viewNotepad.js';
import ViewNoteList from './ui/viewNoteList.js';
import ViewUser from './ui/viewUser.js';

class App {
    #User;
    #Notepad;
    #ViewNotepad;
    #ViewNoteList;
    #ViewUser;

    constructor(user, notepad, viewNotepad, viewNoteList, viewUser) {
        this.#User = user;
        this.#Notepad = notepad;
        this.#ViewNotepad = viewNotepad;
        this.#ViewNoteList = viewNoteList;
        this.#ViewUser = viewUser;

        this.registerEvents();
        this.loadLoginInfo();
    }

    registerEvents() {
        this.#ViewNoteList.addNewNoteEvent(this.handleAddNewNote.bind(this));
        this.#ViewNoteList.addDeleteNoteEvent(this.handleDeleteNote.bind(this));
        this.#ViewUser.loginEvent(this.handleLogin.bind(this));
        this.#ViewUser.logoutEvent(this.handleLogout.bind(this));
        this.#ViewNotepad.saveNoteEvent(this.handleSaveNote.bind(this));
        this.#ViewNotepad.saveCurrentTabEvent(this.handleSaveCurrentTab.bind(this));
    }

    loadLoginInfo() {
        this.#User.callLoginInfoApi()
            .then((user) => {
                if (!user) return;
                this.initNotepad(user);
            });
    }

    handleLogin(loginInfo) {
        this.#User.callLoginApi(loginInfo)
            .then((user) => {
                if (!user) return;
                this.initNotepad(user);
            });
    }

    initNotepad(user) {
        this.#ViewUser.renderLoginView(user);
        this.#Notepad.getNotes()
            .then(() => {
                if (this.#Notepad.all.length > 0) {
                    this.renderNotes(this.#Notepad.all);
                }

            })
        this.#User.callGetCurrentTabApi()
            .then(item => {
                if (item.tab) {
                    this.#ViewNoteList.clickTab(item.tab);
                    this.#ViewNotepad.focusCursor(item.cursor);
                }
            })
    }

    renderNotes(notes) {
        this.#Notepad.sortNotes();
        notes.forEach(el => {
            this.#ViewNoteList.setNewNoteEl(el);
            this.#ViewNoteList.addSetNoteEvent(this.handleSetNote.bind(this));
            this.#ViewNoteList.renderNote();
        })
    }

    handleAddNewNote() {
        const newNote = this.#Notepad.getNewNote();
        this.#Notepad.addNote(newNote);
        this.#ViewNoteList.setNewNoteEl(newNote);
        this.#ViewNoteList.addSetNoteEvent(this.handleSetNote.bind(this));
        this.#ViewNoteList.renderNote();
    }

    handleSaveCurrentTab(e) {
        if (this.#User.login) {
            const currentTab = {
                cursor: e.target.className,
                tab: this.#ViewNoteList.currentNoteLi.id,
            };
            this.#User.callSetCurrentTabApi(currentTab);
        }
    }

    handleSaveNote() {
        if (this.#User.login) {
            const obj = this.#ViewNotepad.getNoteValue();
            this.#Notepad.saveCurrentNote(obj);
            this.#ViewNoteList.updateTab(this.#Notepad.currentNote);
        }
    }

    handleSetNote(e) {
        this.#ViewNoteList.setCurrentNoteLi(e.currentTarget);
        this.#Notepad.setCurrentNote(this.#ViewNoteList.currentNoteLi.id);
        this.#ViewNotepad.renderNotepad(this.#Notepad.currentNote);
        this.#ViewNoteList.activeTabColor();
    }

    handleDeleteNote() {
        const id = this.#ViewNoteList.currentNoteLi.id;
        this.#ViewNoteList.deleteNoteLi();
        this.#Notepad.deleteNote(id);
    }

    handleLogout() {
        this.#User.callLogoutApi();
        this.#User.changeLoginStatus();
        this.#ViewUser.renderLogoutView();
        this.#ViewNotepad.reset();
        this.#ViewNoteList.resetNoteList();
    }
}

const user = new User();
const notepad = new Notepad();
const viewNotepad = new ViewNotepad();
const viewNoteList = new ViewNoteList();
const viewUser = new ViewUser();

const app = new App(user, notepad, viewNotepad, viewNoteList, viewUser);
