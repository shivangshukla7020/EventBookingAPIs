const { Events, Bookings } = require('../database/initializeModels');

const createEvent = async (req, res) => {
    try{
        const { title, description, dateTime, location, totalSeats } = req.body;
        if(!title || !description || !dateTime || !location || !totalSeats){
            return res.status(400).json({message : 'All feils are required'});
        }
        if(totalSeats <= 0){
            return res.status(400).json({message : 'Total seats atleast 1 required'});
        }
        await Events.create({ title, description, dateTime, location, totalSeats, availableSeats : totalSeats });
        return res.status(201).json({message : 'Event created successfully'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

const findById = async (req, res) =>{
    try{
        const eventId = req.params.eventId;
        const event = await Events.findOne({where : {id : eventId}});
        if(!event){
            return res.status(404).json({message : 'Event not found'});
        }
        res.status(200).json(event);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

const updateById = async(req, res) =>{
    try{
        const eventId = req.params.eventId;
        const event = await Events.findOne({where : {id : eventId}});
        if(!event){
            return res.status(404).json({message : 'Event not found'});
        }

        const { title, description, dateTime, location, totalSeats } = req.body;

        if(totalSeats){
            const bookedSeats = event.totalSeats - event.availableSeats; // Calculating booked seats
            if(totalSeats < bookedSeats){
                return res.json({message : `Totalseats can't be less than booked seats : ${bookedSeats}`});
            }

            event.totalSeats = totalSeats;
            event.availableSeats = totalSeats - bookedSeats;
        } 

        if(title) event.title = title;
        if(description) event.description = description;
        if(dateTime) event.dateTime = dateTime;
        if(location) event.location = location;
        
        await event.save();

        res.status(200).json({message : 'Event updated successfully'});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

const deleteById = async (req, res) =>{
    try{
        const eventId = req.params.eventId;
        const event = await Events.findOne({where : {id : eventId}});
        if(!event){
            return res.status(404).json({message : 'Event not found'});
        }

        //We must ensure that all bookings related to this event gets removed
        await Bookings.destroy({where : { eventId }});

        await event.destroy();
        return res.status(200).json({message : 'Event and all associated bookings removed successfully'});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message : `Internal server error : ${err}`});
    }
}

const getAllEvents = async (req, res) => {
  try {
    const events = await Events.findAll({order: [['dateTime', 'ASC']]});
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createEvent, findById, updateById, deleteById, getAllEvents };