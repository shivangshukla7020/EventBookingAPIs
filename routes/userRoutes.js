const express = require('express');
const { signupUser, loginUser, findById, updateById, deleteById, getAllUsers } = require('../controllers/userController');
const authorizeUserOrAdmin = require('../middlewares/authorizedUserOrAdmin');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();

router.post('/signup', signupUser);

router.post('/login', loginUser);

router.get('/',isLoggedIn, isAdmin, getAllUsers);

router.get('/:userId',authorizeUserOrAdmin, findById);

router.put('/:userId',authorizeUserOrAdmin, updateById);

router.delete('/:userId',authorizeUserOrAdmin, deleteById);


module.exports = router;