const util = require('util');
const mysql = require('mysql2');

let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'burgers_db',
  });
}

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
