const Competitor = require('../models/competitor');

const competitorService = {
  // Create a new competitor
  createCompetitor: async (competitorData) => {
    // Directly await the promise returned by Competitor.create
    return await Competitor.create(competitorData);
  },

  // Get a competitor by ID
  getCompetitorById: async (competitorId) => {
    // Directly await the promise returned by Competitor.getById
    return await Competitor.getById(competitorId);
  },

  // Update a competitor
  updateCompetitor: async (competitorId, competitorData) => {
    // Directly await the promise returned by Competitor.update
    return await Competitor.update(competitorId, competitorData);
  },

  // Delete a competitor
  deleteCompetitor: async (competitorId) => {
    // Directly await the promise returned by Competitor.delete
    return await Competitor.delete(competitorId);
  },
};

module.exports = competitorService;