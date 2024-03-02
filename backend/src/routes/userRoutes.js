const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');

// Route for user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route for updating a user's information
// This route is protected by the JWT authentication middleware
router.put('/:id', authenticateJWT, userController.updateUser);

// Route for deleting a user
// This route is also protected by the JWT authentication middleware
router.delete('/:id', authenticateJWT, userController.deleteUser);

module.exports = router;