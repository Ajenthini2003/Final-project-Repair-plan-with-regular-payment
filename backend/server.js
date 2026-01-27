import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// ===== IMPORT ROUTES =====
import authRoutes from "./routes/auth.js";
import plansRoutes from "./routes/plans.js";
import userRoutes from "./routes/users.js"; // <-- ADD THIS

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ===== API ROUTES =====
app.use("/api/auth", authRoutes);    // Signup & Login routes
app.use("/api/plans", plansRoutes);  // Plan CRUD routes
app.use("/api/users", userRoutes);   // <-- ADD THIS

// ===== CONNECT TO MONGODB & START SERVER =====
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Stop server if DB connection fails
  }
};

// Run DB connection
connectDB();
