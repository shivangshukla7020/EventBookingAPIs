const createAdmin = require('../utils/createAdmin');
const sequelize = require('./sequelize');

const connectDB = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connected to database successfully");
        createAdmin();
    }
    catch(err){
        console.log(`Failed to connect database : ${err}`);
    }
}

module.exports = connectDB;