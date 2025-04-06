const express = require("express");
const router = express.Router();
const Expenditure = require("../models/Expenditure");

// POST: Add new expenditure
router.post("/", async (req, res) => {
    try {
        const expense = new Expenditure(req.body);
        const savedExpense = await expense.save();
        res.status(201).json(savedExpense); // Return the saved expense
    } catch (err) {
        console.error("Add expenditure error:", err);
        res.status(500).json({ error: "Failed to record expenditure." });
    }
});
// GET: All expenditures
router.get("/", async (req, res) => {
    try {
        const expenses = await Expenditure.find().sort({ createdAt: -1 });
        res.json(expenses);
    } catch (err) {
        console.error("Fetch expenditures error:", err);
        res.status(500).json({ error: "Failed to fetch expenditures." });
    }
});

module.exports = router;
