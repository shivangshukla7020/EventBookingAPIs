const { Sequelize } = require('sequelize');
require('dotenv').config();

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize('postgres', username, password, {
  host: 'localhost',
  dialect: 'postgres'
});

const connectDB = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connected to database successfully");
    }
    catch(err){
        console.log(`Failed to connect database : ${err}`);
    }
}

module.exports = connectDB;