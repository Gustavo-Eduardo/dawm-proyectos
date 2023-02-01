var express = require('express');
var router = express.Router();
const customersRouter = require("./customers")

router.get('/api', function (req, res, next) {
  res.send({
    routes: {
      "customers": "api/customers"
    }
  });
});

router.use('/api/customers', customersRouter)



module.exports = router;
