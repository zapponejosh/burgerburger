const orm = require('../config/orm');

// use burger specifc input to the ORM
const burgers = {
  create(cols, vals, cb) {
    // only needs one column but can take multiple in an array
    orm.create('burgers', cols, vals, (res) => {
      cb(res);
    });
  },
  all(cb) {
    orm.all('burgers', (res) => {
      cb(res);
    });
  },
  update(burgerId, cb) {
    orm.update('burgers', 'devoured = NOT devoured', burgerId, (res) => {
      cb(res);
    });
  },
  delete(burgerId, cb) {
    orm.delete('burgers', burgerId, (res) => {
      cb(res);
    });
  },
};

// export it

module.exports = burgers;
