import base from './index_api.js';

export default {
    getLoginInfo() {
        return base('GET', '/user/loginInfo')
            .then(data => data)
            .catch(err => {
                console.error(err);
            })
    },

    login(loginInfo) {
        return base('POST', '/user/login', loginInfo)
            .then(data => data)
            .catch(err => {
                console.error(err);
            })
    },

    logout() {
        return base('GET', '/user/logout')
            .then(data => data)
            .catch(err => {
                console.error(err);
            })
    },

    getCurrentTab() {
        return base('GET', '/user/tab')
            .then(data => data)
            .catch(err => {
                console.error(err);
            })
    },

    setCurrentTab(tabInfo) {
        return base('POST', '/user/tab', tabInfo)
            .then(data => data)
            .catch(err => {
                console.error(err);
            })
    },
};
