const crypto = require('crypto');
const db = require('../models');
const User = db.user;

exports.signUp = async (req, res) => {
    try {
        if (!req.body.id || !req.body.pw) {
            res.status(400).send({
                message: 'Please fill up the sign up form',
            });
            return;
        }

        const salt = Math.floor(new Date().valueOf() * Math.random(7)) + '';
        const hashPw = crypto.createHash('sha512').update(req.body.pw + salt).digest('hex');
    
        const signUpForm = {
            id: req.body.id,
            password: hashPw,
            nickname: req.body.nickname,
            salt: salt,
        };
    
        await User.create(signUpForm);
        res.end(JSON.stringify({ ok: 1, msg: 'success!' }));

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed' }));
    }
};

exports.loginInfo = async (req, res) => {
    try {
        const item = await User.findOne({
            where: {
                id: req.session.userId,
            },
        });

        const result = {
            nickname: item.nickname,
            login: true,
        };
        
        res.end(JSON.stringify({ ok: 1, msg: 'success!', item: result }));

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed' }));
    }
}

exports.login = async (req, res) => {
    try {
        const result = await User.findOne({
            where: {
                id: req.body.id,
            },
        });
        if (result === null) {
            res.end(JSON.stringify({ ok: 0, msg: 'Not found!' }));
        }

        const dbPw = result.dataValues.password;
        const salt = result.dataValues.salt;
        const hashPw = crypto.createHash('sha512').update(req.body.pw + salt).digest('hex');
    
        if (dbPw === hashPw) {
            const sess = req.session;
            sess.userId = req.body.id;
            const item = {
                nickname: result.dataValues.nickname,
                login: true,
            };
            res.end(JSON.stringify({ ok: 1, msg: 'success!', item }));
        } else {
            res.end(JSON.stringify({ ok: 0, msg: '아이디 혹은 비밀번호가 일치하지 않습니다!' }));
        }

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed!' }));
    }
};

exports.logout = (req, res) => {
    try {
        req.session.destroy();
        res.end(JSON.stringify({ ok: 1, msg: '정상적으로 로그아웃 됐습니다' }));
    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || '로그아웃에 실패 했습니다' }));
    }
};

exports.getCurrentTab = (req, res) => {
    try {
        const item = {
            cursor: req.session.cursor,
            tab: req.session.tab,
        };
        res.end(JSON.stringify({ ok: 1, msg: '탭 정보 가져오기 성공', item }));
    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || '탭 정보 가져오기 실패!' }));
    }
};

exports.setCurrentTab = (req, res) => {
    try {
        const { cursor, tab } = req.body;
        req.session.cursor = cursor;
        req.session.tab = tab;
        res.end(JSON.stringify({ ok: 1, msg: '탭 정보 설정 성공' }));
    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || '탭 정보 저장 실패!' }));
    }
};