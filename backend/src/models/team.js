const pool = require('../config/database'); 
const competitorService = require('../services/competitorService');

class Team {

  // Create a new team
  static async create(teamName, hackathonId, challenge_id, competitors) {
    let connection;
    try {
      // Assuming db.getConnection() establishes a new connection
      connection = await pool.getConnection();
      await connection.beginTransaction();

      // Create the team
      let [teamResult] = await connection.execute(
          'INSERT INTO Team (team_name, hackathon_id, challenge_id) VALUES (?, ?, ?)',
          [teamName, hackathonId, challenge_id]
      );
      const teamId = teamResult.insertId;

      // Iterate over competitors and create or link them
      for (const competitor of competitors) {
          let [existing] = await connection.execute(
              'SELECT competitor_id FROM Competitor WHERE email = ? LIMIT 1',
              [competitor.email]
          );

          let competitorId;
          if (existing.length > 0) {
              competitorId = existing[0].competitor_id; // Assuming competitor_id is the column name
          } else {
              let createdCompetitor = competitorService.createCompetitor(competitor)
              competitorId = createdCompetitor.insertId;
          }

          // Link competitor to the team in Competitor_Team table
          await connection.execute(
              'INSERT INTO Competitor_Team (competitor_id, team_id) VALUES (?, ?)',
              [competitorId, teamId]
          );
      }

      await connection.commit();
      return { teamId }; // Return the created team ID
  } catch (error) {
      if (connection) await connection.rollback();
      throw error; // Rethrow after rolling back
  } finally {
      if (connection) await connection.release();
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

  static async getCompetitorsByTeamId(teamId) {
    try {
      const [rows] = await pool.execute(`
        SELECT c.*
        FROM Competitor c
        INNER JOIN Competitor_Team ct ON c.competitor_id = ct.competitor_id
        WHERE ct.team_id = ?
      `, [teamId]);

      return rows;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = Team;