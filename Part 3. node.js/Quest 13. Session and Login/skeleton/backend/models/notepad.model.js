module.exports = (sequelize, Sequelize ) => {
    const Notepad = sequelize.define('notepad', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    Notepad.associate = model => {
        Notepad.belongsTo(model);
    };

    return Notepad;
};
