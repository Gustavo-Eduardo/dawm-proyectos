const productsModel = require("../models/products")

exports.getProducts = async (req, res) => {
    const products = await productsModel.find().lean()

    res.send(products)
}