const Sequelize = require('sequelize');
const connection = new Sequelize('rest_api', 'root', 'zapala123');

module.exports = connection;