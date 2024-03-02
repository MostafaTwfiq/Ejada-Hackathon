const Hackathon = require('../models/Hackathon');

const getAllHackathons = async () => {
  return await Hackathon.getAllHackathons();
};

const getHackathonById = async (id) => {
  return await Hackathon.getHackathonById(id);
};

const createHackathon = async (name, theme, registration_start_date, registration_end_date, 
  event_date, max_team_size, max_num_teams, challenges) => {
  return await Hackathon.addHackathon(name, theme, registration_start_date, registration_end_date, 
    event_date, max_team_size, max_num_teams, challenges);
};

const updateHackathon = async (id, hackathonData) => {
  return await Hackathon.updateHackathon(id, hackathonData);
};

const deleteHackathon = async (id) => {
  return await Hackathon.deleteHackathon(id);
};

const getHackathonWithChallenges = async (id) => {
    return await Hackathon.getHackathonWithChallenges(id);
};
  

module.exports = {
  getAllHackathons,
  getHackathonById,
  createHackathon,
  updateHackathon,
  deleteHackathon,
  getHackathonWithChallenges
};