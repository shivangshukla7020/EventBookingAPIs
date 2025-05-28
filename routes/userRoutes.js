const express = require('express');
const { signupUser, loginUser, logoutUser, findById, updateById, deleteById, getAllUsers } = require('../controllers/userController');
const authorizeUserOrAdmin = require('../middlewares/authorizedUserOrAdmin');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User related operations
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user (anyone)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfuly
 *       500:
 *         description: Server error
 *       400:
 *         description: Missing or invalid feilds
 */
router.post('/signup', signupUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user (registered users)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfuly
 *       500:
 *         description: Server error
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out the current user (logged in user)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
router.post('/logout', isLoggedIn, logoutUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users (admin)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal Server error
 *       403:
 *         description: Unauthorized access
 */
router.get('/',isLoggedIn, isAdmin, getAllUsers);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user by ID (Authorized user or admin)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User data
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: user not found
 *       500:
 *         description: internal Server error
 */
router.get('/:userId', isLoggedIn, authorizeUserOrAdmin, findById);

/**
 * @swagger
 * /user/{userId}:
 *   put:
 *     summary: Update user by ID (Authorized user or admin)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfuly
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal Server error
 *       404:
 *         description: User not found
 */
router.put('/:userId',isLoggedIn, authorizeUserOrAdmin, updateById);

/**
 * @swagger
 * /user/{userId}:
 *   delete:
 *     summary: Delete user by ID (Authorized user or admin)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to be fetched
 *     responses:
 *       200:
 *         description: User deleted successfully and all associated bookings too
 *       404:
 *         description: User not found
 *       403:
 *         description: Unauthorized access
 *       500:
 *         description: Internal Server error
 */
router.delete('/:userId', isLoggedIn, authorizeUserOrAdmin, deleteById);

module.exports = router;
