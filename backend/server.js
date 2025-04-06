const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const startupRoutes = require("./routes/startupRoutes");
const fundTransactionRoutes = require("./routes/fundTransactionRoutes");
const expenditureRoutes = require("./routes/expenditureRoutes");
const investmentRoutes = require("./routes/investmentsRoutes");
app.use("/api/startups", startupRoutes);
app.use("/api/fund-transactions", fundTransactionRoutes);
app.use("/api/expenditures", expenditureRoutes);
app.use("/api/investments", investmentRoutes); // <-- Register investment routes

// Root endpoint
app.get("/", (req, res) => {
    res.send("🚀 Backend API is running");
});

// Server start
app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});
