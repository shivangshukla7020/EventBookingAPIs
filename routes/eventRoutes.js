const express = require('express');
const { createEvent, findById, getAllEvents, updateById, deleteById } = require('../controllers/eventController');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/', isLoggedIn, isAdmin,  createEvent);

router.get('/', getAllEvents)

router.get('/:eventId', findById);

router.put('/:eventId', isLoggedIn, isAdmin, updateById);

router.delete('/:eventId', isLoggedIn, isAdmin, deleteById);

module.exports = router;