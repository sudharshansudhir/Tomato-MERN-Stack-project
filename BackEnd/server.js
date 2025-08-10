// server.js

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageroutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // fallback for safety
    credentials: true,
  })
);

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/", authRoutes);
app.use("/pages", pageRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Node + Express server is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
