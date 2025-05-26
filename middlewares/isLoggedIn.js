require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const isLoggedIn = async (req, res, next) => {

    try{
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
        req.user = decoded_token; //Will be passed to isAdmin middleware
        next();
    }
    catch(err){
        return res.json({message : 'Internal error occured'});
    }
}

module.exports = isLoggedIn;
