const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
    investor: {
        type: String,
        required: true,
    },
    startupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
        required: true,
    },
    startupName: {
        type: String,
        required: true,
    },
    startupAddress: {
        type: String,
        required: true,
    },
    amount: {
        type: Number, // ETH value in decimal
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Investment", investmentSchema);
