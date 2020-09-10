const util = require('util');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'burgers_db',
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err.stack}`);
  }
  // check during install
  console.log(`connected as id ${connection.threadId}`);
});

// promisify my queries
connection.query = util.promisify(connection.query);

module.exports = connection;
