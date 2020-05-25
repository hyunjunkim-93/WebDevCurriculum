import userApi from '../api/user_api.js';

export default class User {
    #login = false;
    #user;

    get login() {
        return this.#login;
    }
    get userInfo() {
        return this.#user;
    }
    changeLoginStatus() {
        this.#login = !this.#login;
    }

    callLoginInfoApi () {
        return userApi.getLoginInfo()
            .then(data => {
                if (data.ok) {
                    this.#login = data.user.login;
                    this.#user = data.user;
                    return data.user;
                } else {
                    alert(data.msg);
                }
            })
    }

    callLoginApi(loginInfo) {
        return userApi.login(loginInfo)
            .then(data => {
                if (data.ok) {
                    this.#login = data.user.login;
                    this.#user = data.user;
                    return data.user;
                } else {
                    alert(data.msg);
                }
            })
    }

    callLogoutApi() {
        return userApi.logout()
            .then(data => {
                if (data.ok) {
                    console.log(data.msg);
                } else {
                    alert(data.msg);
                }
            })
    }

    callGetCurrentTabApi() {
        return userApi.getCurrentTab()
            .then(data => {
                if (data.ok) {
                    return data.item;
                } else {
                    alert(data.msg);
                }
            })
    }

    callSetCurrentTabApi(tabInfo) {
        return userApi.setCurrentTab(tabInfo)
            .then(data => {
                if (data.ok) {
                    console.log(data.msg);
                } else {
                    alert(data.msg);
                }
            })
    }
}
