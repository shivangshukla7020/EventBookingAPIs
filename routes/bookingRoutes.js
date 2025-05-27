const express = require('express');
const { createBooking, findById, showMyBookings, getAllBookings, updateById, deleteById } = require('../controllers/bookingController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const authorizeUserOrAdmin = require('../middlewares/authorizedUserOrAdmin');
const router = express.Router();

router.post('/',isLoggedIn, createBooking);

router.get('/my/:userId', authorizeUserOrAdmin, showMyBookings);

router.get('/',isAdmin, getAllBookings);

router.get('/:bookingId',isAdmin, findById);

router.put('/:bookingId',isAdmin, updateById);

router.delete('/:bookingId',isLoggedIn, deleteById);

module.exports = router;