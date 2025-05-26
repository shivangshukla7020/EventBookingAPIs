const { Sequelize } = require('sequelize');
require('dotenv').config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize('postgres', username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;