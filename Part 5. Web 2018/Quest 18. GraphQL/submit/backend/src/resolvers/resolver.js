const { createSalt, getScryptHash, isSameAB } = require('../utils/index.js');

module.exports = {
    Query: {
        notepads: async (parent, args, { db, req }) => {
            const result = await db.notepad.findAll({
                where: {
                    userId: req.session.userId,
                },
            })
            return result;
        },
        login: async (parent, args, { db, req }) => {
            const result = await db.user.findOne({
                where: {
                    id: args.id
                },
            });

            if (!result) return false;

            const dbPw = result.dataValues.password;
            const salt = result.dataValues.salt;
            const hashPw = getScryptHash(args.password, salt);

            const isSame = isSameAB(dbPw, hashPw);
            if (isSame) req.session.userId = args.id;
            return isSame;
        },
        logout: (parent, args, { req }) => {
            req.session.destroy();
            return !req.session ? true : false;
        },
        auth: (parent, args, { req }) => {
            return req.session.userId ? true : false;
        },
    },
    Mutation: {
        createNote: async (parent, args, { db, req }) => {
            const info = {
                title: args.title,
                text: args.text,
                userId: req.session.userId,
            };
            const result = await db.notepad.create(info);
            return result;
        },
        updateNote: async (parent, args, { db }) => {
            const info = {
                title: args.title,
                text: args.text,
            };

            const result = await db.notepad.update(info, {
                where: {
                    id: args.id,
                },
            });
            return result ? true : false;
        },
        deleteNote: (parent, args, { db }) => {
            const result = db.notepad.destroy({
                where: {
                    id: args.id,
                },
            });
            return result ? true : false;
        },
        signUp: async (parent, args, { db, req }) => {
            
            const salt = createSalt();
            const hashPw = getScryptHash(args.password, salt);

            const signUpForm = {
                id: args.id,
                password: hashPw,
                nickname: args.nickname,
                salt: salt,
            };

            const result = await db.user.create(signUpForm);
            const isSame = isSameAB(result.dataValues.id, args.id)
            if (isSame) req.session.userId = args.id;
            return isSame;
        },
    },
};
