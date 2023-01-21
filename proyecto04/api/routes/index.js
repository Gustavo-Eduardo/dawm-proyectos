var express = require('express');
var router = express.Router();
const customersRouter = require("../routes/customers")
const productsRouter = require("../routes/products")
const ordersRouter = require("../routes/orders")

router.use('/api/customers', customersRouter)
router.use('/api/products', productsRouter)
router.use('/api/orders', ordersRouter)

module.exports = router;
