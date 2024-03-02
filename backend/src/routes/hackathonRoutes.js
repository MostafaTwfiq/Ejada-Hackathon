const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');

// Get all hackathons
router.get('/', hackathonController.getAllHackathons);

// Get a single hackathon by ID
router.get('/:id', hackathonController.getHackathonById);

// Add a new hackathon
router.post('/', hackathonController.addHackathon);

// Update a hackathon
router.put('/:id', hackathonController.updateHackathon);

// Delete a hackathon
router.delete('/:id', hackathonController.deleteHackathon);

// Get a single hackathon by ID with challenges
router.get('/:id/challenges', hackathonController.getHackathonByIdWithChallenges);

module.exports = router;