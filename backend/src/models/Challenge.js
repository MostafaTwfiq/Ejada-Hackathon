const db = require('../config/database');

class Challenge {
  // Fetch all challenges
  static async getAllChallenges() {
    try {
      const [rows] = await db.execute('SELECT * FROM Challenge');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a single challenge by ID
  static async getChallengeById(challengeId) {
    try {
      const [rows] = await db.execute('SELECT * FROM Challenge WHERE challenge_id = ?', [challengeId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Add a new challenge
  static async addChallenge(challengeData) {
    const { title } = challengeData;
    try {
      const [result] = await db.execute('INSERT INTO Challenge (title) VALUES (?)', [title]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update a challenge
  static async updateChallenge(challengeId, challengeData) {
    const { title } = challengeData;
    try {
      const [result] = await db.execute('UPDATE Challenge SET title = ? WHERE challenge_id = ?', [title, challengeId]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a challenge
  static async deleteChallenge(challengeId) {
    try {
      const [result] = await db.execute('DELETE FROM Challenge WHERE challenge_id = ?', [challengeId]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Challenge;