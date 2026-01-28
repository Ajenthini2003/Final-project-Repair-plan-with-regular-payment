import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createPayment,
  getMyPayments,
  getPaymentById,
  getAllPayments,
  verifyRazorpayPayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.route("/")
  .post(protect, createPayment)
  .get(protect, admin, getAllPayments);

router.get("/my-payments", protect, getMyPayments);
router.get("/:id", protect, getPaymentById);
router.post("/verify-razorpay", protect, verifyRazorpayPayment);

export default router;