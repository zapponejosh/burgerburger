const express = require('express');
const burgers = require('../models/burgers');

const router = express.Router();

// get root route
router.get('/', (req, res) => {
  burgers.all((result) => {
    const hbsOb = {
      burgers: result,
    };
    console.log(hbsOb);
    // sends object to handlebars template
    // use for testing in postman
    // res.send(hbsOb);
    res.render('index', hbsOb);
  });
});

// add burger (post)
router.post('/api/burgers', (req, res) => {
  console.log(req.body);
  burgers.create(['burger_name'], [req.body.burger], (result) => {
    res.json({ id: result.insertId });
  });
});

// devour burger (put) WITH
// make burger again (put)
router.put('/api/burgers/:id', (req, res) => {
  // The query will revers the devoured bool in the table
  // if the it has been eaten you can use the same query to make it again
  burgers.update(req.params.id, (result) => {
    // if it has been eaten the status returned should be false
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

router.delete('/api/burgers/delete/:id', (req, res) => {
  burgers.delete(req.params.id, (result) => {
    console.log(result);
    if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

module.exports = router;
