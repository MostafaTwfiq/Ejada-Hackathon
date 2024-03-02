const Hackathon = require('../models/Hackathon');

const getAllHackathons = async () => {
  return await Hackathon.getAllHackathons();
};

const getHackathonById = async (id) => {
  return await Hackathon.getHackathonById(id);
};

const createHackathon = async (hackathonData) => {
  return await Hackathon.addHackathon(hackathonData);
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