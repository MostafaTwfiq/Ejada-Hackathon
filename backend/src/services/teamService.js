const Team = require('../models/team');

const teamService = {
  // Create a new team
  createTeam: async (teamName, hackathonId, competitors) => {
    return new Promise(async (resolve, reject) => {
      try {
        const teamId = await Team.create(teamName, hackathonId, competitors)
        resolve(teamId);
      } catch (error) {
        reject(error);
      }
      
      // Team.create(teamName, hackathonId, competitors, (error, results) => {
      //   if (error) {
      //     reject(error);
      //   } else {
      //     resolve(results);
      //   }
      // });
    });
  },

  // Get a team by ID
  getTeamById: async (teamId) => {
    return new Promise((resolve, reject) => {
      Team.getById(teamId, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Update a team
  updateTeam: async (teamId, teamData) => {
    return new Promise((resolve, reject) => {
      Team.update(teamId, teamData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Delete a team
  deleteTeam: async (teamId) => {
    return new Promise((resolve, reject) => {
      Team.delete(teamId, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Get teams by hackathon ID
  getTeamsByHackathonId: async (hackathonId) => {
    return new Promise((resolve, reject) => {
      Team.getByHackathonId(hackathonId, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
};

module.exports = teamService;