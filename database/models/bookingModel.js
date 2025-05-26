const { DataTypes } = require('sequelize');

const createBookingModel = (sequelize) =>{
    const Booking = sequelize.define('Booking',{
        eventId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        userId : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        seatsBooked : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
    })

    return Booking;
}

module.exports = createBookingModel;