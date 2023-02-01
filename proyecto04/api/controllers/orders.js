const axios = require("axios")

exports.getCustomerOrders = async (req, res) => {
    const customerId = req.params.customerId
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const url = process.env.SALES_URL + "/api/orders/customer/" + customerId
    const response = await axios.get(url, { params: { page, limit } })
    res.send(response)
}

