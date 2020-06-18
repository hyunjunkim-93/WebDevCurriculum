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

    User.associate = model => {
        User.hasMany(model);
    };

    return User;
};
