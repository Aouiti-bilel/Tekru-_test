const Sequelize = require('sequelize')

const sequelize = require('./DB');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alloNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    famiy_name: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        alloNull: false,
    },
});
module.exports = User