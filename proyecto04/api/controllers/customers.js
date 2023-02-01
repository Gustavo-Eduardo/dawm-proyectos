const axios = require("axios")

exports.getCustomers = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const url = process.env.ENTERPRISE_URL + "/api/customers"
    const proxy = { host: process.env.ENTERPRISE_HOST, port: process.env.ENTERPRISE_PORT }

    const response = await axios.get(url, { params: { page, limit, proxy } })

    res.send(response.data)
}