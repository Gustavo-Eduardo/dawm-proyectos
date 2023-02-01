const productsModel = require("../models/products")

exports.getProducts = async (req, res) => {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const offset = (page - 1) * limit
    const products = await productsModel.find({}, null, { skip: offset, limit }).lean()
    const totalProducts = await productsModel.find({}, { _id: 1 })

    res.send({
        data: products,
        meta: {
            currentPage: page,
            perPage: limit,
            totalPages: Math.ceil(totalProducts.length / limit),
            totalItems: totalProducts.length
        }
    })
}