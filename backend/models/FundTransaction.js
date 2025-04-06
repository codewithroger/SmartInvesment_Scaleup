const mongoose = require("mongoose");

const fundTransactionSchema = new mongoose.Schema({
    investor: { type: String, required: true },
    startupName: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FundTransaction", fundTransactionSchema);
