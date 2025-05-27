require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const { Bookings } = require('../database/initializeModels');

// Checks for authorized user || admin for routes like {findById, updateById, deleteById etc};
const authorizeUserOrAdmin = async (req, res, next) => {
    try{
        const userRole = req.user.role;
        let userId;
        if(req.params.userId){
            userId = req.params.userId;
        }
        else if(req.params.bookingId){
            const booking = await Bookings.findOne({where : {id : req.params.bookingId}});
            if(!booking){
                return res.json(404).json({message : 'Booking not found'});
            }
            
            userId = booking.userId;
        }

        if(userRole != 'admin' && userId != req.user.userId){
            return res.status(403).json({message : 'Unauthorized Access'});
        }

        next();
    }
    catch(err){
        return res.status(500).json({message : 'Internal server error'});
    }
}

module.exports = authorizeUserOrAdmin;



