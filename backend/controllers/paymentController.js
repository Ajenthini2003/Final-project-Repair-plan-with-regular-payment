import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import crypto from "crypto";

// @desc    Create payment
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
  try {
    const { bookingId, planId, amount, paymentMethod } = req.body;

    let payment;
    
    if (bookingId) {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      payment = new Payment({
        user: req.user._id,
        booking: bookingId,
        amount: booking.finalPrice,
        paymentMethod
      });

      // Update booking payment status
      booking.paymentStatus = "paid";
      booking.paymentMethod = paymentMethod;
      await booking.save();
    } else if (planId) {
      const plan = await Plan.findById(planId);
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }

      payment = new Payment({
        user: req.user._id,
        plan: planId,
        amount: plan.price,
        paymentMethod
      });

      // Update user subscription
      const user = await User.findById(req.user._id);
      const endDate = new Date();
      
      switch (plan.duration) {
        case "monthly":
          endDate.setMonth(endDate.getMonth() + 1);
          break;
        case "quarterly":
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case "yearly":
          endDate.setFullYear(endDate.getFullYear() + 1);
          break;
      }

      user.subscription = {
        planId,
        status: "active",
        startDate: new Date(),
        endDate
      };
      
      await user.save();
    } else {
      return res.status(400).json({ message: "Either bookingId or planId is required" });
    }

    // Generate transaction ID
    payment.transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // For demo purposes, mark as success immediately
    // In real app, integrate with Razorpay/Stripe here
    payment.status = "success";
    payment.razorpayOrderId = `order_${Date.now()}`;
    payment.razorpayPaymentId = `pay_${Date.now()}`;
    
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user payments
// @route   GET /api/payments/my-payments
// @access  Private
const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("booking", "service")
      .populate("plan", "name duration")
      .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("booking")
      .populate("plan")
      .populate("user", "name email");
    
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check if user owns the payment
    if (payment.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all payments (admin)
// @route   GET /api/payments
// @access  Private/Admin
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("booking")
      .populate("plan")
      .sort({ createdAt: -1 });
    
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Razorpay payment (example)
// @route   POST /api/payments/verify-razorpay
// @access  Private
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment status
      const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
      if (payment) {
        payment.status = "success";
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        await payment.save();
      }

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createPayment,
  getMyPayments,
  getPaymentById,
  getAllPayments,
  verifyRazorpayPayment
};