require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;


// This middleware is specifically for userController {findById, deleteById} to deny unauthorized user data access but gives admin access
const authorizeUserOrAdmin = async (req, res, next) => {
    const jwt_token = req.cookies.jwt;

    if(!jwt_token){
        return res.json({message : 'Log in first'});
    }

    let decoded_token;
    try{
        decoded_token = jwt.verify(jwt_token, SECRET_KEY);
    }
    catch(err){
        console.log('Invalid Token');
        return res.json({message : 'Inavlid token'});
    }

    const userRole = decoded_token.role;

    if(userRole != 'admin' && id != decoded_token.userId){
        return res.json({message : 'Unauthorized Access'});
    }

    next();
}

module.exports = authorizeUserOrAdmin;



