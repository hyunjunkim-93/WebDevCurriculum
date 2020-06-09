import customAxios from './index.js';

export default {
    signin(loginInfo) {
        return customAxios.post(`/user/signin`, loginInfo)
            .then(response => {
                const { data } = response;
                return {
                    ok: data.ok,
                    msg: data.msg,
                    item: data.item || '',
                };
            })
    },
    signup(joinInfo) {
        return customAxios.post(`/user/signup`, joinInfo)
            .then(response => {
                const { data } = response;
                return {
                    ok: data.ok,
                    msg: data.msg,
                    item: data.item || '',
                };
            })
    },
  };
