// server.js

const express = require('express');
const dotenv = require('dotenv');
const path=require("path")
const authRoutes=require("./routes/authRoutes")
const pageroutes=require("./routes/pageroutes")
const cors = require('cors');
const connectDB = require('./config/db');

// Load .env variables
dotenv.config();

// Connect MongoDB
connectDB();

// Init app 
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
// Middlewares
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

// // Routes (to be created later)
app.use('/', authRoutes);
app.use("/pages",pageroutes)

app.get("/",(req,res)=>{
    res.send("Node+Express created ");
})


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
