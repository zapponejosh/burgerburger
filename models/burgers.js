const orm = require('../config/orm');

// Also inside burger.js, create the code that will call the ORM functions using burger specific input for the ORM.

const burger = {
  create(vals, cb) {
    // only needs one column but can take multiple in an array
    orm.create('burgers', ['burger_name'], [vals], (res) => {
      cb(res);
    });
  },
  all(cb) {
    orm.all('burgers', (res) => {
      cb(res);
    });
  },
  update(statusBool, burgerName, cb) {
    orm.update('burgers', `{status: ${statusBool}}`, (res) => {
      cb(res);
    });
  },
};

// export it

module.exports = burger;
