const mysql = require('mysql');
require('dotenv').config();  // Load environment variables from .env file

const db = mysql.createConnection({
  host: process.env.DB_HOST,    // Use environment variable for host
  user: process.env.DB_USER,    // Use environment variable for user
  password: process.env.DB_PASSWORD,  // Use environment variable for password
  database: process.env.DB_NAME,      // Use environment variable for database name
  port: process.env.DB_PORT || 3306   // Use environment variable for port, default to 3306 if not provided
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = db;

