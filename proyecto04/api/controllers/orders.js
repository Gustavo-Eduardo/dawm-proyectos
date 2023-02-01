const axios = require("axios")

exports.getCustomerOrders = async (req, res) => {
    const customerId = req.params.customerId
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const url = process.env.SALES_URL + "/api/orders/customer/" + customerId
    const proxy = { host: process.env.SALES_HOST, port: process.env.SALES_PORT }
    const response = await axios.get(url, { params: { page, limit, proxy } })
    res.send(response.data)
}

exports.calculateTotal = async (req, res) => {
    const orders = req.body
    const total = orders.reduce((acc, order) => acc + (order.priceEach * order.quantityOrdered), 0)
    res.send({ total })
}

