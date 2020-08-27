const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    dni: String,
    email: String,
    month: Number,
    year: Number
})

module.exports = mongoose.model("Customer", customerSchema);