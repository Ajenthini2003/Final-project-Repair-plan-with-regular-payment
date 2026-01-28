import express from "express";
import { protect, technician, admin } from "../middleware/authMiddleware.js";
import {
  getTechnicians,
  getTechnicianById,
  getTechnicianStats,
  updateTechnicianProfile,
  getMyBookings,
  updateAvailability
} from "../controllers/technicianController.js";

const router = express.Router();

router.route("/")
  .get(getTechnicians);

router.route("/dashboard/stats")
  .get(protect, technician, getTechnicianStats);

router.route("/my-bookings")
  .get(protect, technician, getMyBookings);

router.route("/profile")
  .put(protect, technician, updateTechnicianProfile);

router.route("/availability")
  .put(protect, technician, updateAvailability);

router.route("/:id")
  .get(getTechnicianById);

export default router;