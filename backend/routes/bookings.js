import express from "express";
import { protect, admin, technician } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  assignTechnician,
  cancelBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.route("/")
  .post(protect, createBooking)
  .get(protect, admin, getAllBookings);

router.get("/my-bookings", protect, getMyBookings);
router.get("/:id", protect, getBookingById);
router.put("/:id/status", protect, admin, updateBookingStatus);
router.put("/:id/assign-technician", protect, admin, assignTechnician);
router.put("/:id/cancel", protect, cancelBooking);

export default router;