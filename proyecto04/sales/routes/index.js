var express = require('express');
var router = express.Router();
const ordersRouter = require("./orders")
const productsRouter = require("./products")

router.get('/api', function (req, res, next) {
  res.send({
    routes: {
      "orders": "api/orders",
      "products": "api/products"
    }
  });
});

router.use('/api/orders', ordersRouter)
router.use('/api/products', productsRouter)

module.exports = router;
