const db = require('../config/database');
const Challenge = require('./Challenge.js');

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
  static async addHackathon(name, theme, registration_start_date, registration_end_date, 
    event_date, max_team_size, max_num_teams, challenges) {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();
      
      // Create the hackathon
      let [hackathonResult] = await connection.execute(
        'INSERT INTO Hackathon (name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, theme, registration_start_date, registration_end_date, event_date, max_team_size, max_num_teams]
      );
      const hackathonId = hackathonResult.insertId;

      // Iterate over challenges and create or link them
      for (const challenge of challenges) {
        let [existing] = await connection.execute(
          'SELECT challenge_id FROM Challenge WHERE title = ? LIMIT 1',
          [challenge.title]
        );

        let challengeId;
        if (existing.length > 0) {
          challengeId = existing[0].challenge_id;
        } else {
          let createdChallenge = Challenge.addChallenge(challenge)
          challengeId = createdChallenge.insertId;
        }

        // Link challenge to the hackathon in Hachathon_Challenge table
        await connection.execute(
          'INSERT INTO Hackathon_Challenge (hackathon_id, challenge_id) VALUES (?, ?)',
          [hackathonId, challengeId]
        );
      }

      await connection.commit();
      return { hackathonId };
    } catch (error) {
      if (connection) await connection.rollback();
      throw error; // Rethrow after rolling back
    } finally {
      if (connection) await connection.release();
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