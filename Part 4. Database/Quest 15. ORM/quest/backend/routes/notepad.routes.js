module.exports = app => {
    const notepad = require('../controllers/notepad.controller.js');
    const router = require('express').Router();

    router.get('/all', notepad.findAll);
    router.post('/new', notepad.create);
    router.put('/update', notepad.update);
    router.delete('/delete', notepad.delete);

    app.use('/api/notepad', router);
};
