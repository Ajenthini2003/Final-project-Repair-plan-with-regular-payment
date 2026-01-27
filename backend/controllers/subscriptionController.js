import User from "../models/User.js";
import Plan from "../models/Plan.js";

// ===================== SUBSCRIBE A PLAN =====================
export const subscribePlan = async (req, res) => {
  const { userId, planId } = req.params;

  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    if (user.subscribedPlans?.includes(planId)) {
      return res.status(400).json({ message: "Already subscribed to this plan" });
    }

    user.subscribedPlans = [...(user.subscribedPlans || []), planId];
    await user.save();

    res.status(200).json({
      message: `Subscribed to ${plan.name}`,
      subscribedPlans: user.subscribedPlans,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Subscription failed", error: err.message });
  }
};

// ===================== UNSUBSCRIBE A PLAN =====================
export const unsubscribePlan = async (req, res) => {
  const { userId, planId } = req.params;

  try {
    const user = await User.findById(userId);
    const plan = await Plan.findById(planId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    if (!user.subscribedPlans?.includes(planId)) {
      return res.status(400).json({ message: "User is not subscribed to this plan" });
    }

    user.subscribedPlans = user.subscribedPlans.filter((id) => id.toString() !== planId);
    await user.save();

    res.status(200).json({
      message: `Unsubscribed from ${plan.name}`,
      subscribedPlans: user.subscribedPlans,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unsubscription failed", error: err.message });
  }
};

// ===================== GET USER SUBSCRIPTIONS =====================
export const getUserSubscriptions = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Return subscribed plan IDs
    res.status(200).json(user.subscribedPlans || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch subscriptions", error: err.message });
  }
};
