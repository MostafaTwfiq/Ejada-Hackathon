const hackathonService = require('../services/hackathonService');

const hackathonController = {
  getAllHackathons: async (req, res) => {
    try {
      const hackathons = await hackathonService.getAllHackathons();
      res.status(200).json(hackathons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getHackathonById: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      const hackathon = await hackathonService.getHackathonById(hackathonId);
      if (hackathon) {
        res.status(200).json(hackathon);
      } else {
        res.status(404).json({ message: 'Hackathon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addHackathon: async (req, res) => {
    try {
      const newHackathon = await hackathonService.createHackathon(req.body);
      res.status(201).json({ message: 'Hackathon added successfully', hackathonId: newHackathon.insertId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateHackathon: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      await hackathonService.updateHackathon(hackathonId, req.body);
      res.status(200).json({ message: 'Hackathon updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteHackathon: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      await hackathonService.deleteHackathon(hackathonId);
      res.status(200).json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getHackathonByIdWithChallenges: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      const hackathon = await hackathonService.getHackathonWithChallenges(hackathonId);
      if (hackathon) {
        res.status(200).json(hackathon);
      } else {
        res.status(404).json({ message: 'Hackathon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = hackathonController;