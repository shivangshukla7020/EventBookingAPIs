const express = require('express');
const { createEvent, findById, getAllEvents, updateById, deleteById } = require('../controllers/eventController');
const router = express.Router();

router.post('/createEvent', createEvent);

router.get('/getAllEvents', getAllEvents)

router.get('/:eventId', findById);

router.put('/:eventId', updateById);

router.delete('/:eventId', deleteById);

module.exports = router;