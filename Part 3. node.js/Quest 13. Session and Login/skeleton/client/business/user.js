import userApi from '../api/user_api.js';

export default class User {
    #login = false;
    #nickname;

    get login() {
        return this.#login;
    }
    changeLoginStatus() {
        this.#login = !this.#login;
    }

    callLoginInfoApi () {
        return userApi.getLoginInfo()
            .then(data => {
                if (data.ok) {
                    this.#login = data.item.login;
                    this.#nickname = data.item.nickname;
                    return this.#nickname;
                } else {
                    alert(data.msg);
                }
            })
    }

    callLoginApi(loginInfo) {
        return userApi.login(loginInfo)
            .then(data => {
                if (data.ok) {
                    this.#login = data.item.login;
                    this.#nickname = data.item.nickname;
                    return this.#nickname;
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
