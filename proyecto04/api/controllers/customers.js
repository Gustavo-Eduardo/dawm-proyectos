const axios = require("axios")

exports.getCustomers = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const url = process.env.ENTERPRISE_URL + "/api/customers"
    const response = await axios.get(url, { params: { page, limit } })
    res.send(response)
}