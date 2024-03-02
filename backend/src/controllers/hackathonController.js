const Hackathon = require('../models/Hackathon');

const hackathonController = {
  // Get all hackathons
  getAllHackathons: async (req, res) => {
    try {
      const hackathons = await Hackathon.getAllHackathons();
      res.status(200).json(hackathons);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single hackathon by ID
  getHackathonById: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      const hackathon = await Hackathon.getHackathonById(hackathonId);
      if (hackathon) {
        res.status(200).json(hackathon);
      } else {
        res.status(404).json({ message: 'Hackathon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add a new hackathon
  addHackathon: async (req, res) => {
    try {
      const newHackathon = await Hackathon.addHackathon(req.body);
      res.status(201).json({ message: 'Hackathon added successfully', hackathonId: newHackathon.insertId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a hackathon
  updateHackathon: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      await Hackathon.updateHackathon(hackathonId, req.body);
      res.status(200).json({ message: 'Hackathon updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete a hackathon
  deleteHackathon: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      await Hackathon.deleteHackathon(hackathonId);
      res.status(200).json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single hackathon by ID with challenges
  getHackathonByIdWithChallenges: async (req, res) => {
    try {
      const hackathonId = req.params.id;
      const hackathon = await Hackathon.getHackathonWithChallenges(hackathonId);
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