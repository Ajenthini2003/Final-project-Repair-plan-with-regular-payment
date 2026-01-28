import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "electrical",
        "plumbing",
        "appliances",
        "ac-cooling",
        "carpentry",
        "painting",
        "security",
        "tech-it",
        "cleaning",
        "emergency",
      ],
    },

    price: {
      type: Number,
      required: true,
    },

    estimatedTime: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// ✅ DEFAULT EXPORT (IMPORTANT)
const Service = mongoose.model("Service", serviceSchema);
export default Service;
