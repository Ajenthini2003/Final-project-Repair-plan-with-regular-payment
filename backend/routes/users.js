import express from "express";
import User from "../models/User.js";
import { subscribePlan, unsubscribePlan } from "../controllers/subscriptionController.js";

const router = express.Router();

// GET user subscriptions
router.get("/:userId/subscriptions", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.subscribedPlans || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Subscribe
router.post("/:userId/subscribe/:planId", subscribePlan);

// Unsubscribe
router.post("/:userId/unsubscribe/:planId", unsubscribePlan);

export default router;
