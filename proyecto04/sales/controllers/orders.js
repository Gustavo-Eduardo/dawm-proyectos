const ordersModel = require("../models/orders")

exports.getOrders = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const offset = (page - 1) * limit
    const orders = await ordersModel.find({}, null, { skip: offset, limit }).lean()
    const totalOrders = await ordersModel.find({}, { _id: 1 }) // projection to optimize call

    res.send({
        data: orders,
        meta: {
            currentPage: page,
            perPage: limit,
            totalPages: Math.ceil(totalOrders.length / limit),
            totalItems: totalOrders.length
        }
    })
}

exports.getCustomerOrders = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const offset = (page - 1) * limit
    const customerNumber = +req.params.customerId
    const orders = await ordersModel.find({ customerNumber, status: "Shipped" }, null, { skip: offset, limit }).lean()
    const totalOrders = await ordersModel.find({ customerNumber, status: "Shipped" }, { _id: 1 }) // projection to optimize call

    res.send({
        data: orders,
        meta: {
            currentPage: page,
            perPage: limit,
            totalPages: Math.ceil(totalOrders.length / limit),
            totalItems: totalOrders.length
        }
    })
}