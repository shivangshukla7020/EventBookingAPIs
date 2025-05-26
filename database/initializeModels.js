const createUserModel = require('../models/userModel');
const createEventModel = require('../models/eventModel');
const createBookingModel = require('../models/bookingModel');
const sequelize = require('./sequelize');

const Users = createUserModel(sequelize);
const Events = createEventModel(sequelize);
const Bookings = createBookingModel(sequelize);

(async ()=>{
    await sequelize.sync()
    console.log("Initialized models");
})();

module.exports = {Users, Events, Bookings};