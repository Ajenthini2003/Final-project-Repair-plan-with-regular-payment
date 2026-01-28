import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["booking", "payment", "subscription", "system", "promotion"],
    default: "system"
  },
  relatedTo: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "relatedModel"
  },
  relatedModel: {
    type: String,
    enum: ["Booking", "Payment", "Plan", "Service"]
  },
  isRead: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;