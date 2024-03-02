const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Route to create a new team
router.post('/', teamController.createTeam);

// Route to get a team by ID
router.get('/:id', teamController.getTeamById);

// Route to update a team
router.put('/:id', teamController.updateTeam);

// Route to delete a team
router.delete('/:id', teamController.deleteTeam);

// Route to get teams by hackathon ID
router.get('/hackathon/:hackathonId', teamController.getTeamsByHackathonId);

module.exports = router;