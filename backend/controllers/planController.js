import Plan from "../models/Plan.js";

// ===== GET ALL PLANS =====
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// ===== GET PLAN BY ID =====
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch plan" });
  }
};

// ===== CREATE PLAN =====
export const createPlan = async (req, res) => {
  try {
    const { name, price, duration, services, description } = req.body;
    const newPlan = await Plan.create({ name, price, duration, services, description });
    res.status(201).json({ message: "Plan created", plan: newPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create plan" });
  }
};

// ===== UPDATE PLAN =====
export const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json({ message: "Plan updated", plan: updatedPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

// ===== DELETE PLAN =====
export const deletePlan = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json({ message: "Plan deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete plan" });
  }
};
