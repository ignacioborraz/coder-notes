const mongoose = require("mongoose")

const schema = mongoose.Schema({
    products: [{
        id: { type: mongoose.Types.ObjectId },
        quantity: { type: Number }
    }]
})

const Cart = mongoose.model('carts', schema)

module.exports = Cart