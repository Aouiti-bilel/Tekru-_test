const Sequelize = require('sequelize')

const sequelize = require('./DB');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alloNull: false,
        primaryKey: true
        
    },
    name:{
        type:Sequelize.STRING,
        unique: true
    } ,
    famiy_name: Sequelize.STRING,
    password: {
        type: Sequelize.STRING,
        alloNull: false,
    },
    last_login: Sequelize.DATE
   
});
module.exports = User