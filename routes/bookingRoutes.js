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
 *   description: Booking-related operations
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Book an event
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - userId
 *               - seatsBooked
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *               seatsBooked:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking successful
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */
router.post('/', isLoggedIn, createBooking);

/**
 * @swagger
 * /booking/my/{userId}:
 *   get:
 *     summary: Get all bookings of a user (admin and authorized user only)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: List of all bookings of a user
 *       500:
 *         description: Server error
 */
router.get('/my/:userId', authorizeUserOrAdmin, showMyBookings);

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings on database (admin only)
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *       500:
 *         description: Server error
 */
router.get('/', isLoggedIn, isAdmin, getAllBookings);

/**
 * @swagger
 * /booking/{bookingId}:
 *   get:
 *     summary: Get booking by ID (admin only)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Booking data
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.get('/:bookingId', authorizeUserOrAdmin, findById);

/**
 * @swagger
 * /booking/{bookingId}:
 *   put:
 *     summary: Update booking by ID (admin only)
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
 *               - userId
 *               - seatsBooked
 *             properties:
 *               eventId:
 *                 type: string
 *               userId:
 *                 type: string
 *               seatsBooked:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.put('/:bookingId', isAdmin, updateById);

/**
 * @swagger
 * /booking/{bookingId}:
 *   delete:
 *     summary: Delete booking by ID (logged-in user)
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Server error
 */
router.delete('/:bookingId', isLoggedIn, deleteById);

module.exports = router;