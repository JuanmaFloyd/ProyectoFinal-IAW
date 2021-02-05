const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    dni: String,
    number: String,
    month: Number,
    year: Number,
    cMonth: Number,
    cYear: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model("Customer", customerSchema);