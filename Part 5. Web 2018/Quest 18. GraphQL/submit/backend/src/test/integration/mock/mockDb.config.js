module.exports = {
    HOST: 'localhost',
    USER: 'test-user',
    PASSWORD: 'Qwer1234!',
    DB: 'mock',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
