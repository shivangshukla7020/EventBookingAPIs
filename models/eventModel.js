const { DataTypes } = require('sequelize');

const createEventModel = (sequelize) =>{
    const Event = sequelize.define('Event',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        dateTime : {
            type : DataTypes.DATE,
            allowNull : false,
        },
        location : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        totalSeats : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        availableSeats : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },

    })

    return Event;
}

module.exports = createEventModel;
