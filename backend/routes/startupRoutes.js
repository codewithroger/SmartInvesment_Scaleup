const express = require("express");
const router = express.Router();
const Startup = require("../models/Startup");

// POST /api/startups - Add a new startup
router.post("/", async (req, res) => {
    const { name, founder, description, industry, address } = req.body;

    // Basic validation
    if (!name || !founder || !description || !industry || !address) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        // Check for duplicate by wallet address
        const existing = await Startup.findOne({ address });
        if (existing) {
            return res.status(409).json({ error: "Startup with this wallet address already exists." });
        }

        const newStartup = new Startup({ name, founder, description, industry, address });
        await newStartup.save();

        res.status(201).json({ message: "Startup added successfully!", startup: newStartup });
    } catch (error) {
        console.error("Error saving startup:", error);
        res.status(500).json({ error: "Failed to add startup." });
    }
});

// GET /api/startups - Get all startups
router.get("/", async (req, res) => {
    try {
        const startups = await Startup.find();
        res.json(startups);
    } catch (error) {
        console.error("Error fetching startups:", error);
        res.status(500).json({ error: "Failed to fetch startups." });
    }
});

module.exports = router;
