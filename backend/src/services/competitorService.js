const Competitor = require('../models/competitor');

const competitorService = {
  // Create a new competitor
  createCompetitor: async (competitorData) => {
    return new Promise((resolve, reject) => {
      Competitor.create(competitorData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Get a competitor by ID
  getCompetitorById: async (competitorId) => {
    return new Promise((resolve, reject) => {
      Competitor.getById(competitorId, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Update a competitor
  updateCompetitor: async (competitorId, competitorData) => {
    return new Promise((resolve, reject) => {
      Competitor.update(competitorId, competitorData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Delete a competitor
  deleteCompetitor: async (competitorId) => {
    return new Promise((resolve, reject) => {
      Competitor.delete(competitorId, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = competitorService;