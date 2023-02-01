const axios = require("axios")

exports.getProducts = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const url = process.env.SALES_URL + "/api/products"
    const proxy = { host: process.env.SALES_HOST, port: process.env.SALES_PORT }
    const response = await axios.get(url, { params: { page, limit, proxy } })
    res.send(response.data)
}