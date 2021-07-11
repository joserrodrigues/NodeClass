const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Type = sequelize.define('type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
});

module.exports = Type;