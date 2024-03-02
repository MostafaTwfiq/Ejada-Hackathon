const Competitor = {
    // Function to create a new competitor
    create: (competitorData, callback) => {
      const query = `
        INSERT INTO Competitor (competitor_id, name, email, mobile, title)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      const { competitor_id, name, email, mobile, title } = competitorData;
  
      pool.query(query, [competitor_id, name, email, mobile, title], (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    },
  
    // Function to get competitor details by competitor ID
    getById: (competitorId, callback) => {
      const query = `SELECT * FROM Competitor WHERE competitor_id = ?`;
  
      pool.query(query, [competitorId], (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results[0]);
        }
      });
    },
  
    // Function to update competitor details
    update: (competitorId, competitorData, callback) => {
      const query = `
        UPDATE Competitor
        SET name = ?, email = ?, mobile = ?, title = ?
        WHERE competitor_id = ?
      `;
      
      const { name, email, mobile, title } = competitorData;
  
      pool.query(query, [name, email, mobile, title, competitorId], (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    },
  
    // Function to delete a competitor by competitor ID
    delete: (competitorId, callback) => {
      const query = `DELETE FROM Competitor WHERE competitor_id = ?`;
  
      pool.query(query, [competitorId], (error, results) => {
        if (error) {
          callback(error);
        } else {
          callback(null, results);
        }
      });
    }
  };
  
  module.exports = Competitor;