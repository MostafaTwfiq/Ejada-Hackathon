const Team = require('../models/team');

const teamService = {
  // Create a new team
  createTeam: async (teamName, hackathonId, competitors) => {
    // Assuming Team.create now returns a promise
    return await Team.create(teamName, hackathonId, competitors);
  },

  // Get a team by ID
  getTeamById: async (teamId) => {
    // Assuming Team.getById now returns a promise
    return await Team.getById(teamId);
  },

  // Update a team
  updateTeam: async (teamId, teamData) => {
    // Assuming Team.update now returns a promise
    return await Team.update(teamId, teamData);
  },

  // Delete a team
  deleteTeam: async (teamId) => {
    // Assuming Team.delete now returns a promise
    return await Team.delete(teamId);
  },

  // Get teams by hackathon ID
  getTeamsByHackathonId: async (hackathonId) => {
    // Assuming Team.getByHackathonId now returns a promise
    return await Team.getByHackathonId(hackathonId);
  },

  getCompetitorsByTeamId: async (teamId) => {
    return await Team.getCompetitorsByTeamId(teamId);
  }
};

module.exports = teamService;