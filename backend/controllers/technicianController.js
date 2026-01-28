import Technician from "../models/Technician.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

// @desc    Get all technicians
// @route   GET /api/technicians
// @access  Public
const getTechnicians = async (req, res) => {
  try {
    const { specialization, available } = req.query;
    let query = {};
    
    if (specialization) {
      query.specialization = specialization;
    }
    
    if (available === "true") {
      query.availability = true;
    }
    
    const technicians = await Technician.find(query)
      .populate("user", "name email phone profileImage")
      .populate("currentJob");
    
    res.json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get technician by ID
// @route   GET /api/technicians/:id
// @access  Public
const getTechnicianById = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id)
      .populate("user", "name email phone profileImage")
      .populate("currentJob");
    
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    // Get technician's recent bookings
    const recentBookings = await Booking.find({ 
      technician: technician._id,
      status: "completed"
    })
    .limit(5)
    .sort({ createdAt: -1 })
    .populate("user", "name");

    res.json({
      ...technician.toObject(),
      recentBookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get technician dashboard stats
// @route   GET /api/technicians/dashboard/stats
// @access  Private/Technician
const getTechnicianStats = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const monthlyBookings = await Booking.countDocuments({
      technician: technician._id,
      status: "completed",
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const pendingBookings = await Booking.countDocuments({
      technician: technician._id,
      status: { $in: ["pending", "confirmed"] }
    });

    const totalEarnings = await Booking.aggregate([
      {
        $match: {
          technician: technician._id,
          status: "completed",
          paymentStatus: "paid"
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$finalPrice" }
        }
      }
    ]);

    const stats = {
      totalJobs: technician.totalJobs,
      completedJobs: technician.completedJobs,
      rating: technician.rating,
      monthlyBookings,
      pendingBookings,
      totalEarnings: totalEarnings[0]?.total || 0
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update technician profile
// @route   PUT /api/technicians/profile
// @access  Private/Technician
const updateTechnicianProfile = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    Object.keys(req.body).forEach(key => {
      if (key !== "user" && key !== "_id") {
        technician[key] = req.body[key];
      }
    });

    const updatedTechnician = await technician.save();
    
    // Update user info if provided
    if (req.body.userInfo) {
      await User.findByIdAndUpdate(req.user._id, req.body.userInfo);
    }

    res.json(updatedTechnician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get technician's bookings
// @route   GET /api/technicians/my-bookings
// @access  Private/Technician
const getMyBookings = async (req, res) => {
  try {
    const technician = await Technician.findOne({ user: req.user._id });
    
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }

    const bookings = await Booking.find({ technician: technician._id })
      .populate("user", "name email phone address")
      .populate("service", "name category")
      .sort({ scheduledDate: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update technician availability
// @route   PUT /api/technicians/availability
// @access  Private/Technician
const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const technician = await Technician.findOneAndUpdate(
      { user: req.user._id },
      { availability },
      { new: true }
    );

    res.json(technician);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getTechnicians,
  getTechnicianById,
  getTechnicianStats,
  updateTechnicianProfile,
  getMyBookings,
  updateAvailability
};