const mongoose = require("mongoose")
const { Schema } = mongoose;

const productsSchema = Schema({
    code: String,
    description: String,
    name: String,
    line: String,
    scale: Number,
    stock: Number,
    price: Number,
    vendor: String,
    textDescription: String,
    htmlDescription: String,
    image: String,
    msrp: Number,
})







module.exports = mongoose.model("products", productsSchema)