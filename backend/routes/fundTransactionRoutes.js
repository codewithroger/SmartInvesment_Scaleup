const express = require("express");
const router = express.Router();
const FundTransaction = require("../models/FundTransaction");

// POST new fund transaction
router.post("/", async (req, res) => {
    try {
        const tx = new FundTransaction(req.body);
        await tx.save();
        res.status(201).json({ message: "Transaction recorded." });
    } catch (err) {
        console.error("Add fund transaction error:", err);
        res.status(500).json({ error: "Failed to record transaction." });
    }
});

// GET all fund transactions (like transaction history)
router.get("/", async (req, res) => {
    try {
        const transactions = await FundTransaction.find().sort({ createdAt: -1 });

        const formatted = transactions.map(tx => ({
            startupName: tx.startupName,
            startupAddress: tx.startupAddress,
            amount: tx.amount,
            sender: tx.sender,
            createdAt: tx.createdAt,
        }));

        res.json(formatted);
    } catch (err) {
        console.error("Fetch transactions error:", err);
        res.status(500).json({ error: "Failed to fetch transactions." });
    }
});

module.exports = router;
