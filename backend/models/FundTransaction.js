// models/FundTransaction.js
const mongoose = require("mongoose");

const FundTransactionSchema = new mongoose.Schema({
    startupName: String,
    startupAddress: String,
    sender: String,
    amount: Number,
}, { timestamps: true });

module.exports = mongoose.model("FundTransaction", FundTransactionSchema);
