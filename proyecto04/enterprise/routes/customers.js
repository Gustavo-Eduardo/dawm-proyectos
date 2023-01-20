var express = require('express');
var router = express.Router();
const customersController = require("../controllers/customers")



router.get("/", customersController.getCustomers)

module.exports = router