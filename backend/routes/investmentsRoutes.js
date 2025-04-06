const express = require("express");
const router = express.Router();
const Investment = require("../models/Investment");

// GET all investments
router.get("/", async (req, res) => {
    try {
        const investments = await Investment.find();
        res.json(investments);
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({ error: "Failed to fetch investments." });
    }
});

// POST a new investment
router.post("/", async (req, res) => {
    const { investor, startupId, startupName, startupAddress, amount } = req.body;

    if (!investor || !startupId || !startupName || !startupAddress || !amount) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newInvestment = new Investment({
            investor,
            startupId,
            startupName,
            startupAddress,
            amount
        });
        await newInvestment.save();
        res.status(201).json({ message: "Investment saved successfully!" });
    } catch (error) {
        console.error("Error saving investment:", error);
        res.status(500).json({ error: "Failed to save investment." });
    }
});

module.exports = router;
