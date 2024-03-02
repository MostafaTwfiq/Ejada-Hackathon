const express = require('express');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();
const teamController = require('../controllers/teamController');

// Route to create a new team
router.post('/', authenticateJWT, teamController.createTeam);

// Route to get a team by ID
router.get('/:id', authenticateJWT, teamController.getTeamById);

// Route to update a team
router.put('/:id', authenticateJWT, teamController.updateTeam);

// Route to delete a team
router.delete('/:id', authenticateJWT, teamController.deleteTeam);

// Route to get teams by hackathon ID
router.get('/hackathon/:hackathonId', authenticateJWT, teamController.getTeamsByHackathonId);

// POST request to create a new team along with competitors
router.post('/', teamController.createTeamWithCompetitors);

module.exports = router;