import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "./models/Plan.js";

dotenv.config();

const mockPlans = [
  {
    name: "Basic Plan",
    price: 2500,
    duration: "monthly",
    services: ["Home appliance diagnostics", "Minor electrical repairs", "Plumbing checkups", "1 Emergency service per month"],
    description: "Perfect for basic home maintenance needs"
  },
  {
    name: "Standard Plan",
    price: 6500,
    duration: "quarterly",
    services: ["All Basic Plan services", "AC servicing", "Electronics repair", "3 Emergency services per quarter", "Priority booking"],
    description: "Comprehensive coverage for your home"
  },
  {
    name: "Premium Plan",
    price: 22000,
    duration: "yearly",
    services: ["All Standard Plan services", "Unlimited emergency services", "Vehicle repairs", "Smart device installation", "24/7 support", "Free annual maintenance"],
    description: "Complete peace of mind for the whole year"
  }
];

const seedPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Plan.deleteMany(); // Clear existing plans
    await Plan.insertMany(mockPlans);

    console.log("Plans seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedPlans();
