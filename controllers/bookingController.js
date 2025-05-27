const { Bookings, Events } = require('../database/initializeModels');

const createBooking = async(req, res) => {
    try{
        const { eventId, seatsBooked } = req.body;

        if(!eventId || !seatsBooked){
            return res.status(400).json({message : 'All fields are required'});
        }

        const userId = req.user.userId;

        if(seatsBooked <= 0){
            return res.status(400).json({message : 'At least one seat is required'});
        }

        const event = await Events.findOne({where : { id : eventId}});

        if(!event){
            return res.status(404).json({message : 'Event not found'});
        }

        if(event.availableSeats < seatsBooked){
            return res.status(400).json({message : 'Not enough seats available'});
        }

        event.availableSeats -= seatsBooked;

        await event.save();
        await Bookings.create({ eventId, userId, seatsBooked });

        res.status(201).json({message : 'Booking successful'});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
    
}


const findById = async(req, res) => {
    try{
        const bookingId = req.params.bookingId;

        const booking = await Bookings.findOne({where : { id : bookingId}});

        if(!booking){
            return res.status(404).json({message : 'Booking not found'});
        }
        res.status(200).json(booking);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
    
}

//Only admins will be allowed to update existing bookings
const updateById = async(req, res) => {
    try{
        const bookingId = req.params.bookingId;
        const booking = await Bookings.findOne({where : { id : bookingId}});

        if(!booking){
            return res.status(404).json({message : 'Booking not found'});
        }
        const { eventId, userId, seatsBooked } = req.body;

        if(!eventId || !userId || !seatsBooked){
            return res.status(400).json({message : 'All fields are required'});
        }

        const event = await Events.findOne({where : { id : eventId }});

        if(!event){
            return res.status(404).json({message : 'Event not found'});
        }

        const prevSeatsBooked = booking.seatsBooked;
        const freeSeats = event.availableSeats + prevSeatsBooked;

        if(freeSeats < seatsBooked){
            return res.status(400).json({message : 'Not enough seats available'});
        }

        event.availableSeats = freeSeats - seatsBooked;

        await event.save();

        booking.eventId = eventId;
        booking.userId = userId;
        booking.seatsBooked = seatsBooked;

        await booking.save();

        res.status(200).json({message : 'Booking updated successfully'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
    
}

const deleteById = async(req, res) => {
    try{
        const bookingId = req.params.bookingId;

        const booking = await Bookings.findOne({where : { id : bookingId}});

        if(!booking){
            return res.status(404).json({message : 'Booking not found'});
        }

        const event = await Events.findOne({where : {id : booking.eventId}});

        if(!event){
            return res.status(404).json({message : 'Event not found'});
        }

        event.availableSeats += booking.seatsBooked;

        await event.save();
        await booking.destroy();

        res.status(200).json({message : 'Booking deleted successfully'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

// Users to get their bookings
const showMyBookings = async (req, res) =>{
    try{
        const userId = req.params.userId;

        const bookings = await Bookings.findAll({where : {userId}});

        return res.status(200).json(bookings);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

// This is admin specific route to get all bookings on the server
const getAllBookings = async (req, res) =>{
    try{
        const bookings = await Bookings.findAll();
        return res.status(200).json(bookings);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

module.exports = { createBooking, findById, updateById, deleteById, showMyBookings, getAllBookings };