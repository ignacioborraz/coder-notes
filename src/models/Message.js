const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    last_name: {type: String, required: true},
    age: {type: Number, required: true},
    nick: {type: String, required: true},
    photo: {type: String, required: true}
})

const schema = mongoose.Schema({
    user: userSchema,
    message: {type: String, required: true}
})

const Message = mongoose.model('messages', schema)

module.exports = Message