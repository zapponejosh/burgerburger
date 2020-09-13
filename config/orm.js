const connection = require('./connnection');

function printQuestionMarks(num) {
  const arr = [];

  for (let i = 0; i < num; i += 1) {
    arr.push('?');
  }
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
  update(table, colVal, condition, cb) {
    const queryString = `
        UPDATE 
            ${table} 
        SET 
            ${colVal}
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
  delete(table, condition, cb) {
    const queryString = `
        DELETE FROM
            ${table} 
        
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
