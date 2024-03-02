const authService = require('../services/authService');

const userController = {
  // Register a new user
  registerUser: async (req, res) => {
    try {
      await authService.registerUser(req.body);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // User login (Authentication)
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await authService.loginUser(username, password);
      res.status(200).json({ 
        message: 'Authentication successful', 
        token: token 
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
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

      await authService.updateUser(userId, req.body);
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
      
      await authService.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;