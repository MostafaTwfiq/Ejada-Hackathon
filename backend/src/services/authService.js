const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config'); // Make sure you have this constant in your config

const registerUser = async (userData) => {
  const { username, password, role } = userData;
  const existingUser = await User.getUserByUsername(username);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const newUser = await User.createUser({ username, password, role });
  return newUser;
};

const loginUser = async (username, password) => {
  const user = await User.getUserByUsername(username);
  if (!user) {
    throw new Error('Authentication failed');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Authentication failed');
  }
  const token = jwt.sign(
    { userId: user.user_id, username: user.username, role: user.role },
    process.env.JWT_SECRET || JWT_SECRET,
    { expiresIn: '1h' }
  );
  return {token, 'role': user.role};
};

const updateUser = async (userId, updateData) => {
    const { username, password, role } = updateData;
    
    // If a new password is provided, hash it
    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
    
    // Update the user in the database
    await User.updateUser(userId, {
      username,
      password: hashedPassword,
      role,
    });
};
  
const deleteUser = async (userId) => {
    await User.deleteUser(userId);
};

const getUserById = async (userId) => {
  await User.getByUserId(userId);
};

  
module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
};
