const express = require('express');
const { createBooking, findById, showMyBookings, getAllBookings, updateById, deleteById } = require('../controllers/bookingController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');
const authorizeUserOrAdmin = require('../middlewares/authorizedUserOrAdmin');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking related Operations
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Book an event (logged in user)
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - seatsBooked
 *             properties:
 *               eventId:
 *                 type: integer
 *               seatsBooked:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking successful
 *       500:
 *         description: Server error
 *       400:
 *         description: Missing or invalid fields
 */
router.post('/', isLoggedIn, createBooking);

/**
 * @swagger
 * /booking/my/{userId}:
 *   get:
 *     summary: Get all bookings of a user (Authorized user or admin)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the user whose bookings are required
 *     responses:
 *       500:
 *         description: Server error
 *       200:
 *         description: List of all bookings of a user
 */
router.get('/my/:userId', isLoggedIn, authorizeUserOrAdmin, showMyBookings);

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings on database (admin)
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Gives all bookings
 *       500:
 *         description: Server error
 */
router.get('/', isLoggedIn, isAdmin, getAllBookings);


/**
 * @swagger
 * /booking/{bookingId}:
 *   get:
 *     summary: Get booking by ID (Authorized user or admin)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       500:
 *         description: Internal Server error
 *       200:
 *         description: Booking details of the user
 *       404:
 *         description: Booking not found
 */
router.get('/:bookingId', isLoggedIn, authorizeUserOrAdmin, findById);

/**
 * @swagger
 * /booking/{bookingId}:
 *   put:
 *     summary: Update booking by ID (admin)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - seatsBooked
 *             properties:
 *               eventId:
 *                 type: integer
 *               seatsBooked:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated successfuly
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put('/:bookingId', isLoggedIn, isAdmin, updateById);

/**
 * @swagger
 * /booking/{bookingId}:
 *   delete:
 *     summary: Delete a booking by ID (Authorized user or admin)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       500:
 *         description: Inrtrnal Server error
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */
router.delete('/:bookingId', isLoggedIn, authorizeUserOrAdmin, deleteById);

module.exports = router;

