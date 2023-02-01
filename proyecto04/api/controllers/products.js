exports.getProducts = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const url = process.env.SALES_URL + "/api/products"
    const response = await axios.get(url, { params: { page, limit } })
    res.send(response)
}