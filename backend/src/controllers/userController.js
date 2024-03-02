const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const userController = {
  // Register a new user
  registerUser: async (req, res) => {
    try {
      const { username, password, role } = req.body;
      
      // Check if user already exists
      const existingUser = await User.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
      
      // Create a new user in the database
      const newUser = await User.createUser({ username, password, role });
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // User login (Authentication)
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      
      // Compare submitted password with stored hashed password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.user_id, username: user.username },
        process.env.JWT_SECRET || JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.status(200).json({ 
        message: 'Authentication successful', 
        token: token 
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a user's information
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      // Check if the authenticated user is the same as the one being updated or if they're an admin
      if (req.user.userId !== parseInt(userId) && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      const { username, password, role } = req.body;
      await User.updateUser(userId, { username, password, role });
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (req.user.userId !== parseInt(userId) && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      
      await User.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;