import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  specialization: [{
    type: String,
    enum: ["electrical", "plumbing", "appliance", "vehicle", "ac", "electronics", "smart-device"]
  }],
  experience: {
    type: Number, // in years
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalJobs: {
    type: Number,
    default: 0
  },
  completedJobs: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  currentJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    default: null
  },
  schedule: [{
    day: String,
    slots: [String]
  }],
  documents: [{
    type: String // URLs to documents
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt on save
technicianSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Technician = mongoose.model("Technician", technicianSchema);
export default Technician;