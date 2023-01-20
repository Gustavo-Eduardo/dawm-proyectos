const mongoose = require("mongoose")
const { Schema } = mongoose;

const ordersSchema = Schema({
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
    image: String
})





module.exports = mongoose.model("orders", ordersSchema)