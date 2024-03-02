const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // Create a new user
  static async createUser(userData) {
    const { username, password, role } = userData;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const [result] = await db.execute(
        'INSERT INTO User (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a user by username
  static async getUserByUsername(username) {
    try {
      const [rows] = await db.execute('SELECT * FROM User WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update a user
  static async updateUser(userId, userData) {
    const { username, password, role } = userData;
    // Hash the password if it's being updated
    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;
    try {
      const [result] = await db.execute(
        'UPDATE User SET username = ?, password = ?, role = ? WHERE user_id = ?',
        [username, hashedPassword || password, role, userId] // Use the hashed password if it exists, otherwise use the existing password
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a user
  static async deleteUser(userId) {
    try {
      const [result] = await db.execute('DELETE FROM User WHERE user_id = ?', [userId]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;