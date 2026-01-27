import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    role: { type: String, default: "user" },
    subscribedPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }], // ✅ Add this
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
