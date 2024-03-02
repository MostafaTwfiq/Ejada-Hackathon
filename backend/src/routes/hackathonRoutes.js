const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();
const hackathonController = require('../controllers/hackathonController');

// Get all hackathons
router.get('/', authenticateJWT, hackathonController.getAllHackathons);

// Get a single hackathon by ID
router.get('/:id', authenticateJWT, hackathonController.getHackathonById);

// Add a new hackathon
router.post('/', authenticateJWT, hackathonController.addHackathon);

// Update a hackathon
router.put('/:id', authenticateJWT, hackathonController.updateHackathon);

// Delete a hackathon
router.delete('/:id', authenticateJWT, hackathonController.deleteHackathon);

// Get a single hackathon by ID with challenges
router.get('/:id/challenges', authenticateJWT, hackathonController.getHackathonByIdWithChallenges);

module.exports = router;