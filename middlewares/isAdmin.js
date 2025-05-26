require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const isAdmin = async (req, res, next) => {

    try{
        const userRole = req.user.role;
        if(userRole != 'admin'){
            return res.json({message : 'Unauthorized Access'});
        }
        next();
    }
    catch(err){
        return res.json({message : 'Internal error occured'});
    }
}

module.exports = isAdmin;