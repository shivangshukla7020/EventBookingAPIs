require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Checks for authorized user || admin for routes like {findById, updateById, deleteById etc};
const authorizeUserOrAdmin = async (req, res, next) => {
    const userRole = req.user.role;
    const userId = req.params.userId;

    if(userRole != 'admin' && userId != req.user.userId){
        return res.status(403).json({message : 'Unauthorized Access'});
    }

    next();
}

module.exports = authorizeUserOrAdmin;



