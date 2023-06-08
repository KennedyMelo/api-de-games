const Sequelize = require('sequelize')

const connection = new Sequelize('apiRestGame', 'root', 'maratona', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection