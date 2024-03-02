const pool = require('../config/database'); 

class Team {

  // Create a new team
  static async create(teamData) {
    try {
      const query = `
        INSERT INTO Team (team_name, hackathon_id)
        VALUES (?, ?)
      `;
      const { team_name, hackathon_id } = teamData;
      const [result] = await pool.execute(query, [team_name, hackathon_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get team by ID
  static async getById(teamId) {
    try {
      const query = `SELECT * FROM Team WHERE team_id = ?`;
      const [rows] = await pool.execute(query, [teamId]);
      return rows[0]; // Assuming team_id is unique, hence returning the first row
    } catch (error) {
      throw error;
    }
  }

  // Update team
  static async update(teamId, teamData) {
    try {
      const query = `
        UPDATE Team
        SET team_name = ?, hackathon_id = ?
        WHERE team_id = ?
      `;
      const { team_name, hackathon_id } = teamData;
      const [result] = await pool.execute(query, [team_name, hackathon_id, teamId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete team
  static async delete(teamId) {
    try {
      const query = `DELETE FROM Team WHERE team_id = ?`;
      const [result] = await pool.execute(query, [teamId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get teams by hackathon ID
  static async getByHackathonId(hackathonId) {
    try {
      const query = `SELECT * FROM Team WHERE hackathon_id = ?`;
      const [rows] = await pool.execute(query, [hackathonId]);
      return rows; // Return all matching rows
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Team;