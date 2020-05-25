export default class ViewUser {
    #id;
    #pw;
    #loginBtn;
    #logoutBtn;
    #nickname;
    #loginView;
    #logoutView;

    constructor() {
        this.#id = document.querySelector('.notepad-id');
        this.#pw = document.querySelector('.notepad-pw');
        this.#loginBtn = document.querySelector('.notepad-btn--login');
        this.#logoutBtn = document.querySelector('.notepad-btn--logout');
        this.#nickname = document.querySelector('.notepad-nickname');
        this.#loginView = document.querySelector('.login-view');
        this.#logoutView = document.querySelector('.logout-view');
    }

    loginEvent(callback) {
        this.#loginBtn.addEventListener('click', () => {
            const loginInfo = { id: this.#id.value, pw: this.#pw.value };
            callback(loginInfo);
        }, false);
    }

    logoutEvent(callback) {
        this.#logoutBtn.addEventListener('click', callback);
    }

    renderLoginView(user) {
        this.#nickname.innerHTML = user.nickname;
        this.#loginView.style.display = 'inline-block';
        this.#logoutView.style.display = 'none';
    }

    renderLogoutView() {
        this.#logoutView.style.display = 'inline-block';
        this.#loginView.style.display = 'none';
        this.#id.value = '';
        this.#pw.value = '';
    }
}
