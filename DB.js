const Sequelize = require('sequelize')

// Local DataBAse
const sequelize = new Sequelize('Tekru', 'root', '', {
      dialect: 'mysql',
      host: 'localhost'
    });
module.exports = sequelize    