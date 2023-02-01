const mongoose = require("mongoose")
const { Schema } = mongoose;

const ordersSchema = Schema({
    orderDate: Date,
    requiredDate: Date,
    shippedDate: Date,
    status: { type: String, enum: ['Cancelled', 'Disputed', 'In Process', 'On Hold', 'Resolved', "Shipped"] },
    comments: String,
    customerNumber: Number,
    orderNumber: Number,
    productCode: String,
    quantityOrdered: Number,
    priceEach: Number,
    orderLineNumber: Number,
    productName: String,
    productLine: String,
    productScale: String,
    productVendor: String,
    productDescription: String,
    quantityInStock: Number,
    buyPrice: Number,
    MSRP: Number,
    textDescription: String,
    htmlDescription: String,
    image: String,
})





module.exports = mongoose.model("orders", ordersSchema)