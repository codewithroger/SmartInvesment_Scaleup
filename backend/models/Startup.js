// models/Startup.js
const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    founder: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true, // 🆕 Make sure address is required
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Startup", startupSchema);
