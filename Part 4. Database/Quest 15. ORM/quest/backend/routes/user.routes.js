module.exports = app => {
    const user = require('../controllers/user.controller.js');
    const router = require('express').Router();

    router.post('/signup', user.signUp);
    router.post('/login', user.login);
    router.get('/loginInfo', user.loginInfo);
    router.get('/logout', user.logout);
    router.get('/tab', user.getCurrentTab);
    router.post('/tab', user.setCurrentTab);

    app.use('/api/user', router);
};
