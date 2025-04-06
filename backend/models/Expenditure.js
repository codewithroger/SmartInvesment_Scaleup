const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    startup: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expenditure", expenditureSchema);
