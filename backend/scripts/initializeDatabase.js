const fs = require('fs');
const mysql = require('mysql2/promise');
const path = require('path');

const pool = require('../config/database'); 

async function initializeDatabase() {
  try {
    /*// Establish a connection to your database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'yourUsername', // Replace with your database username
      password: 'yourPassword', // Replace with your database password
      database: 'yourDatabaseName', // Replace with your database name
    });*/

    // Read the SQL file
    const sqlScript = fs.readFileSync(path.join(__dirname, '../sql/create_tables.sql'), 'utf8');

    // Split the script to separate individual SQL statements (assuming they are separated by ";")
    const sqlStatements = sqlScript.split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length);

    // Execute each SQL statement sequentially
    for (const statement of sqlStatements) {
      await connection.execute(statement);
    }

    console.log('Database initialized successfully.');
    await connection.end();
  } catch (error) {
    console.error('Failed to initialize the database:', error);
  }
}

// Call the function to initialize the database
initializeDatabase();