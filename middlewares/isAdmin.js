const isAdmin = async (req, res, next) => {

    try{
        const userRole = req.user.role;
        if(userRole != 'admin'){
            return res.status(403).json({message : 'Unauthorized Access'});
        }
        next();
    }
    catch(err){
        return res.status(500).json({message : 'Internal error occured'});
    }
}

module.exports = isAdmin;