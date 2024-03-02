const Challenge = require('../models/Challenge');

const getAllChallenges = async () => {
  return await Challenge.getAllChallenges();
};

const getChallengeById = async (id) => {
  return await Challenge.getChallengeById(id);
};

const createChallenge = async (challengeData) => {
  return await Challenge.addChallenge(challengeData);
};

const updateChallenge = async (id, challengeData) => {
  return await Challenge.updateChallenge(id, challengeData);
};

const deleteChallenge = async (id) => {
  return await Challenge.deleteChallenge(id);
};

module.exports = {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};