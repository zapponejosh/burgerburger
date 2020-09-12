const connection = require('./connnection');

function printQuestionMarks(num) {
  const arr = [];

  for (let i = 0; i < num; i += 1) {
    arr.push('?');
  }
  return arr.toString();
}

function objToSql(ob) {
  // change {status: false} to 'status=false
  const arr = [];

  // loop through the keys and push the key/value as a string int arr
  // eslint-disable-next-line no-restricted-syntax
  for (let [key, value] of Object.entries(ob)) {
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = `'${value}'`;
      }

      arr.push(`${key}=${value}`);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const orm = {
  // select all
  all(tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  // insert one
  create(table, cols, vals, cb) {
    const queryString = `
    INSERT INTO ${table} (${cols.toString()})
    VALUES (${printQuestionMarks(vals.length)})
    `;
    console.log(queryString);

    connection.query(
      queryString, vals, (err, result) => {
        if (err) throw err;
        cb(result);
      },
    );
  },
  // update one
  update(table, objColVals, condition, cb) {
    const queryString = `
        UPDATE 
            ${table} 
        SET 
            ${objToSql(objColVals)}
        WHERE
            ${condition}
      `;
    console.log(queryString);

    connection.query(
      queryString, (err, result) => {
        if (err) throw err;
        cb(result);
      },
    );
  },

};

module.exports = orm;
