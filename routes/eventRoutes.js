const express = require('express');
const { createEvent, findById, getAllEvents, updateById, deleteById } = require('../controllers/eventController');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event-related operations
 */

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Create a new event (admin)
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dateTime
 *               - location
 *               - totalSeats
 *               - availableSeats
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', isLoggedIn, isAdmin, createEvent);

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events (anyone)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/', getAllEvents)

/**
 * @swagger
 * /event/{eventId}:
 *   get:
 *     summary: Get event by ID (anyone)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get('/:eventId', findById);

/**
 * @swagger
 * /event/{eventId}:
 *   put:
 *     summary: Update an event (admin)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               totalSeats:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Total seats cannot be less than booked seats
 *       404:
 *         description: Event not found
 */
router.put('/:eventId', isLoggedIn, isAdmin, updateById);

/**
 * @swagger
 * /event/{eventId}:
 *   delete:
 *     summary: Delete an event (admin)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 */
router.delete('/:eventId', isLoggedIn, isAdmin, deleteById);

module.exports = router;
