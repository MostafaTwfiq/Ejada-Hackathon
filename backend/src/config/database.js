// config/database.js

const mysql = require('mysql');

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: "DB_USER",
  password: "DB_PASSWORD",
  database: 'hackathon_management'
});

module.exports = pool;
