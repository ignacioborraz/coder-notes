const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    code: {type: String, required: true, unique: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    thumbnail: {type: String, required: true},
    status: {type: Boolean, required: true},
})

const Product = mongoose.model('products', schema)

module.exports = Product