const crypto = require('crypto');

const createPwInfo = num => {
    const salt = Math.floor(new Date().valueOf() * Math.random(7)) + '';
    const hash = crypto.createHash('sha512').update(num + salt).digest('hex');

    return { salt, hash };
};

module.exports = (sequelize, Sequelize ) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    // const pw1 = createPwInfo(123);
    // const pw2 = createPwInfo(123);
    // const pw3 = createPwInfo(123);

    // User.bulkCreate([
    //     { id: 'test1', password: pw1.hash, nickname: 'Apple', salt: pw1.salt },
    //     { id: 'test2', password: pw2.hash, nickname: 'LG', salt: pw2.salt },
    //     { id: 'test3', password: pw3.hash, nickname: 'Samsung', salt: pw3.salt },
    // ]);

    User.associate = model => {
        User.hasMany(model);
    };

    return User;
};
