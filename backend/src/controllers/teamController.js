const teamService = require('../services/teamService');

const teamController = {
  // Create a new team
  createTeam: async (req, res) => {
    try {
      const teamData = req.body;
      const result = await teamService.createTeam(teamData);
      res.status(201).json({ message: "Team created successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: "Failed to create team", error: error.message });
    }
  },

  // Get a team by ID
  getTeamById: async (req, res) => {
    try {
      const teamId = req.params.id;
      const team = await teamService.getTeamById(teamId);
      if (team) {
        res.status(200).json(team);
      } else {
        res.status(404).json({ message: "Team not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve team", error: error.message });
    }
  },

  // Update a team
  updateTeam: async (req, res) => {
    try {
      const teamId = req.params.id;
      const teamData = req.body;
      const result = await teamService.updateTeam(teamId, teamData);
      res.status(200).json({ message: "Team updated successfully", data: result });
    } catch (error) {
      res.status(500).json({ message: "Failed to update team", error: error.message });
    }
  },

  // Delete a team
  deleteTeam: async (req, res) => {
    try {
      const teamId = req.params.id;
      await teamService.deleteTeam(teamId);
      res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete team", error: error.message });
    }
  },

  // Get teams by hackathon ID
  getTeamsByHackathonId: async (req, res) => {
    try {
      const hackathonId = req.params.hackathonId;
      const teams = await teamService.getTeamsByHackathonId(hackathonId);
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve teams", error: error.message });
    }
  }
};

module.exports = teamController;