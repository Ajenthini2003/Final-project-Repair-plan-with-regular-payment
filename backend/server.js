import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";

// Import Routes
import authRoutes from "./routes/auth.js";
import plansRoutes from "./routes/plans.js";
import userRoutes from "./routes/users.js";
import serviceRoutes from "./routes/services.js";
import bookingRoutes from "./routes/bookings.js";
import technicianRoutes from "./routes/technicians.js";
import paymentRoutes from "./routes/payments.js";
import notificationRoutes from "./routes/notifications.js";

dotenv.config();

const app = express();

// ===================== MIDDLEWARE =====================

// ✅ FIXED CORS (Frontend connection issue solved)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  credentials: true
}));


app.use(express.json());

// ===================== TEST ROUTE =====================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ===================== API ROUTES =====================
app.use("/api/auth", authRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);

// ===================== ERROR HANDLER ==================
app.use(errorHandler);

// ===================== DATABASE CONNECTION =============
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected!");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT || 5000}`
      );
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// ===================== START SERVER ====================
connectDB();
