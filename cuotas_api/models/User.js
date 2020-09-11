const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: String,
    email: String,
    password: String,
    customers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}]
})

module.exports = mongoose.model("User", userSchema);