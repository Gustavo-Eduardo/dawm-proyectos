const ordersModel = require("../models/orders")

exports.getOrders = async (req, res) => {
    const orders = await ordersModel.find().lean()

    res.send(orders)
}

exports.getCustomerOrders = async (req, res) => {
    const customerNumber = +req.params.customerId
    const orders = await ordersModel.find({ customerNumber })
    res.send(orders)
}