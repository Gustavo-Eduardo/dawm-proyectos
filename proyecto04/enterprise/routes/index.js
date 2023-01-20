var express = require('express');
var router = express.Router();
const customersRouter = require("./customers")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("hello");
});

router.get('/api', function (req, res, next) {
  res.send({
    routes: {
      "customers": "api/customers"
    }
  });
});

router.use('/api/customers', customersRouter)



module.exports = router;
