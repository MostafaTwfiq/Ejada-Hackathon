const pool = require('../config/database');

const Team = {
  // Function to create a new team
  create: (teamData, callback) => {
    const query = `
      INSERT INTO Team (team_name, hackathon_id)
      VALUES (?, ?)
    `;
    const { team_name, hackathon_id } = teamData;

    pool.query(query, [team_name, hackathon_id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  // Function to get team details by team ID
  getById: (teamId, callback) => {
    const query = `SELECT * FROM Team WHERE team_id = ?`;

    pool.query(query, [teamId], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]); // Assuming team_id is unique, return the first result.
    });
  },

  // Function to update team details
  update: (teamId, teamData, callback) => {
    const query = `
      UPDATE Team
      SET team_name = ?, hackathon_id = ?
      WHERE team_id = ?
    `;
    const { team_name, hackathon_id } = teamData;

    pool.query(query, [team_name, hackathon_id, teamId], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  // Function to delete a team
  delete: (teamId, callback) => {
    const query = `DELETE FROM Team WHERE team_id = ?`;

    pool.query(query, [teamId], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  // Function to list all teams for a specific hackathon
  getByHackathonId: (hackathonId, callback) => {
    const query = `SELECT * FROM Team WHERE hackathon_id = ?`;

    pool.query(query, [hackathonId], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  }
};

module.exports = Team;