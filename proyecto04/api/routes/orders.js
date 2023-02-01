const express = require("express")
const router = express.Router()
const ordersController = require("../controllers/orders")

router.get('/customer/:customerId', ordersController.getCustomerOrders)

module.exports = router