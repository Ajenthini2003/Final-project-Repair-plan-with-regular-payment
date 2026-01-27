import express from "express";
import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
} from "../controllers/planController.js";

const router = express.Router();

// Public routes
router.get("/", getAllPlans);
router.get("/:id", getPlanById);

// Admin routes (you can add auth later)
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
