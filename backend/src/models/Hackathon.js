const db = require('../config/database');

class Hackathon {
  // Fetch all hackathons
  static async getAllHackathons() {
    try {
      const [rows, fields] = await db.execute('SELECT * FROM Hackathon');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a single hackathon by ID
  static async getHackathonById(hackathonId) {
    try {
      const [rows, fields] = await db.execute('SELECT * FROM Hackathon WHERE hackathon_id = ?', [hackathonId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Add a new hackathon
  static async addHackathon(hackathonData) {
    const { name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams } = hackathonData;
    try {
      const [result] = await db.execute(
        'INSERT INTO Hackathon (name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update a hackathon
  static async updateHackathon(hackathonId, hackathonData) {
    const { name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams } = hackathonData;
    try {
      const [result] = await db.execute(
        'UPDATE Hackathon SET name = ?, theme = ?, registration_start_date = ?, registration_end_date = ?, event_date = ?, max_team_size = ?, max_num_teams = ? WHERE hackathon_id = ?',
        [name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams, hackathonId]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a hackathon
  static async deleteHackathon(hackathonId) {
    try {
      const [result] = await db.execute('DELETE FROM Hackathon WHERE hackathon_id = ?', [hackathonId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getHackathonWithChallenges(hackathonId) {
    try {
      const [hackathon] = await db.execute(`
        SELECT h.*, c.challenge_id, c.title AS challenge_title
        FROM Hackathon h
        LEFT JOIN Hackathon_Challenge hc ON h.hackathon_id = hc.hackathon_id
        LEFT JOIN Challenge c ON hc.challenge_id = c.challenge_id
        WHERE h.hackathon_id = ?
      `, [hackathonId]);

      const hackathon_details = {...hackathon[0]};
      delete hackathon_details.challenge_id;
      delete hackathon_details.challenge_title;
      if (hackathon.length) {
        const result = {
          hackathon_details,
          challenges: hackathon.map(row => ({
            challenge_id: row.challenge_id,
            title: row.challenge_title
          })).filter(challenge => challenge.challenge_id != null) // Filter out null challenges
        };
        return result;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Hackathon;