const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },

    logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notepad = require('./notepad.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);

db.user.associate(db.notepad);
db.notepad.associate(db.user);

module.exports = db;
