var express = require('express');
var router = express.Router();
const orderRouter = require("./orders")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/orders', orderRouter)

module.exports = router;
