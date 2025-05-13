const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12778689',
  password: 'qAZv5lEmRu',
  database: 'sql12778689',
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

module.exports = db;
