const db = require('../models');
const Notepad = db.notepad;

exports.findAll = async (req, res) => {
    try {
        const result = await Notepad.findAll({
            where: {
                userId: req.session.userId,
            },
        }).map(el => el.get({ plain: true }));

        if (result.length > 0) {
            res.end(JSON.stringify({ ok: 1, msg: 'success!', item: result }));
        }  else {
            delete req.session.cursor;
            delete req.session.tab;
            res.end(JSON.stringify({ ok: 0, msg: '저장된 노트가 없습니다!' }));
        }

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed' }));
    }
};

exports.create = async (req, res) => {
    try {
        const info = {
            title: req.body.title,
            text: req.body.text,
            userId: req.session.userId,
        };

        const result = await Notepad.create(info);
        res.end(JSON.stringify({ ok: 1, msg: 'success!', item: result.dataValues }));

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed' }));
    }
};

exports.update = async (req, res) => {
    try {
        const info = {
            title: req.body.title,
            text: req.body.text,
        };
    
        const ok = await Notepad.update(info, {
            where: {
                id: req.body.id,
            },
        });
        const result = await Notepad.findByPk(req.body.id);
        res.end(JSON.stringify({ ok, msg: 'success!', item: result }));

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed' }));
    }
};

exports.delete = async (req, res) => {
    try {
        console.log('work: ' + req.body.id);
        const ok = await Notepad.destroy({
            where: {
                id: req.body.id,
            },
        });
        res.end(JSON.stringify({ ok, msg: 'success' }));

    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: err.message || 'failed' }));

    }
};
