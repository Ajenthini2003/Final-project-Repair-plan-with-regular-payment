import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import User from "../models/User.js";
import Technician from "../models/Technician.js";
import Notification from "../models/Notification.js";

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const {
      service,
      scheduledDate,
      scheduledTime,
      address,
      contactPhone,
      problemDescription,
      priority
    } = req.body;

    // Get service details
    const serviceDetails = await Service.findById(service);
    if (!serviceDetails) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Calculate price
    let totalPrice = serviceDetails.price;
    let discount = 0;
    
    // Check if user has active subscription for discount
    const user = await User.findById(req.user._id);
    if (user.subscription.status === "active") {
      discount = totalPrice * 0.1; // 10% discount for subscribers
    }

    const finalPrice = totalPrice - discount;

    const booking = new Booking({
      user: req.user._id,
      service,
      scheduledDate,
      scheduledTime,
      address,
      contactPhone,
      problemDescription,
      priority: priority || "medium",
      totalPrice,
      discount,
      finalPrice
    });

    const createdBooking = await booking.save();

    // Create notification
    await Notification.create({
      user: req.user._id,
      title: "Booking Created",
      message: `Your booking for ${serviceDetails.name} has been created successfully.`,
      type: "booking",
      relatedTo: createdBooking._id,
      relatedModel: "Booking"
    });

    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service", "name description price")
      .populate("technician", "user")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (admin/technician)
// @route   GET /api/bookings
// @access  Private/Admin/Technician
const getAllBookings = async (req, res) => {
  try {
    let query = {};
    
    // If technician, show only their bookings
    if (req.user.role === "technician") {
      const technician = await Technician.findOne({ user: req.user._id });
      query.technician = technician._id;
    }
    
    const bookings = await Booking.find(query)
      .populate("user", "name email phone")
      .populate("service", "name price")
      .populate("technician", "user")
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("service")
      .populate("technician");
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user has access
    if (req.user.role !== "admin" && 
        req.user.role !== "technician" && 
        booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin/Technician
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    // Create notification for user
    await Notification.create({
      user: booking.user,
      title: "Booking Status Updated",
      message: `Your booking status has been updated to ${status}.`,
      type: "booking",
      relatedTo: booking._id,
      relatedModel: "Booking"
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign technician to booking
// @route   PUT /api/bookings/:id/assign-technician
// @access  Private/Admin
const assignTechnician = async (req, res) => {
  try {
    const { technicianId } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const technician = await Technician.findById(technicianId);
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    booking.technician = technicianId;
    const updatedBooking = await booking.save();

    // Create notifications
    await Notification.create({
      user: booking.user,
      title: "Technician Assigned",
      message: `A technician has been assigned to your booking.`,
      type: "booking",
      relatedTo: booking._id,
      relatedModel: "Booking"
    });

    await Notification.create({
      user: technician.user,
      title: "New Assignment",
      message: `You have been assigned to a new booking.`,
      type: "booking",
      relatedTo: booking._id,
      relatedModel: "Booking"
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user owns the booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "cancelled";
    const updatedBooking = await booking.save();

    // Create notification
    await Notification.create({
      user: booking.user,
      title: "Booking Cancelled",
      message: `Your booking has been cancelled.`,
      type: "booking",
      relatedTo: booking._id,
      relatedModel: "Booking"
    });

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  assignTechnician,
  cancelBooking
};