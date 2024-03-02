const pool = require('../config/database'); 

class Competitor {

  // Create a new competitor
  static async create(competitorData) {
    try {
      const query = `INSERT INTO Competitor (name, email, mobile, title) VALUES (?, ?, ?, ?)`;
      const { name, email, mobile, title } = competitorData;
      const [result] = await pool.execute(query, [name, email, mobile, title]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get competitor by ID
  static async getById(competitorId) {
    try {
      const query = `SELECT * FROM Competitor WHERE competitor_id = ?`;
      const [rows] = await pool.execute(query, [competitorId]);
      return rows[0]; // Assuming ID is unique, hence returning the first row
    } catch (error) {
      throw error;
    }
  }

  // Update competitor
  static async update(competitorId, competitorData) {
    try {
      const query = `UPDATE Competitor SET name = ?, email = ?, mobile = ?, title = ? WHERE competitor_id = ?`;
      const { name, email, mobile, title } = competitorData;
      const [result] = await pool.execute(query, [name, email, mobile, title, competitorId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete competitor
  static async delete(competitorId) {
    try {
      const query = `DELETE FROM Competitor WHERE competitor_id = ?`;
      const [result] = await pool.execute(query, [competitorId]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Competitor;