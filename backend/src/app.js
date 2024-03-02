const express = require('express');
const hackathonRoutes = require('./routes/hackathonRoutes');

const app = express();
const database = require('./config/database');
const teamRoutes = require('./routes/teamRoutes');

// Use the database connection pool in your application
app.set('database', database);
// Middleware to parse JSON bodies
app.use(express.json());
// Use hackathonRoutes for any request that starts with '/hackathons'
app.use('/hackathons', hackathonRoutes);

app.use(express.json()); // Middleware to parse JSON bodies

// Use teamRoutes for any requests that start with '/teams'
app.use('/teams', teamRoutes);

// Other app configurations and routes...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
