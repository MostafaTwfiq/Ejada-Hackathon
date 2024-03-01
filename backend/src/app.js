const express = require('express');
const app = express();
const database = require('./config/database');

// Use the database connection pool in your application
app.set('database', database);

// Other app configurations and routes...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});