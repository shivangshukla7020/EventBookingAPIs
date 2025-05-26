require('dotenv').config();
const { Users } = require('../database/initializeModels');
const bcrypt = require('bcrypt');

// I created this to demonstrate the role based control
const createAdmin = async () =>{
    try{
        const userName = process.env.ADMIN_USERNAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        console.log(userName   + " " + email + " " + password);

        const hashedPassword = await bcrypt.hash(password, 15);

        const user = {
            userName,
            email,
            password : hashedPassword,
            role : 'admin'
        }

        await Users.create(user);

        console.log('Admin created successfully');
    }
    catch(err){
        console.log(`Can't create admin please restart the server : ${err}`);
    }
}

module.exports = createAdmin;