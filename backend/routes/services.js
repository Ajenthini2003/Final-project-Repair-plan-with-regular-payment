import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// GET ALL SERVICES
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isAvailable: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// ADD NEW SERVICE (optional – for admin / seeding)
router.post("/", async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
