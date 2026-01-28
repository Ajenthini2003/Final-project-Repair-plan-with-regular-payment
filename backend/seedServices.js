import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./models/Service.js";

dotenv.config();

const mockServices = [
  {
    name: "Electrical Wiring Repair",
    description: "Professional repair and installation of electrical wiring systems",
    category: "electrical",
    price: 1200,
    duration: "2-3 hours",
    image: "/services/electrical.jpg"
  },
  {
    name: "AC Servicing",
    description: "Complete AC maintenance and repair service",
    category: "ac",
    price: 1500,
    duration: "1-2 hours",
    image: "/services/ac.jpg"
  },
  {
    name: "Plumbing Repair",
    description: "Fix leaks, clogs, and plumbing installations",
    category: "plumbing",
    price: 1000,
    duration: "1-2 hours",
    image: "/services/plumbing.jpg"
  },
  {
    name: "Appliance Repair",
    description: "Repair of home appliances like washing machine, fridge, etc.",
    category: "appliance",
    price: 800,
    duration: "2-4 hours",
    image: "/services/appliance.jpg"
  },
  {
    name: "Smart Device Installation",
    description: "Installation and setup of smart home devices",
    category: "smart-device",
    price: 2000,
    duration: "3-4 hours",
    image: "/services/smart-device.jpg"
  },
  {
    name: "Emergency Repair",
    description: "24/7 emergency repair service",
    category: "emergency",
    price: 2500,
    duration: "Immediate response",
    image: "/services/emergency.jpg"
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Service.deleteMany();
    await Service.insertMany(mockServices);

    console.log("Services seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedServices();