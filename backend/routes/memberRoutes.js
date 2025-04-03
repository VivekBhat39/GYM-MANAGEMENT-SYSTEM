const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const Member = require("../models/Member");
const Package = require("../models/Package");
const { ObjectId } = mongoose.Types;

// Add a new member
router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const { name, phone, email, packageId, startDate, endDate } = req.body;

    // const selectedPackage = await Package.findById(packageId);
    // if (!selectedPackage) return res.json({ error: "Package not found" });

    const savedMember = await Member.create({ name, phone, email, packageId, startDate, endDate })
    res.json({ status: "success", data: savedMember })
  } catch (error) {
    res.json({ error: "Server error" });
  }
});

// Get all members
router.get("/", async (req, res) => {
  try {
    const allMembers = await Member.find().populate("packageId");
    res.json({ staus: "success", data: allMembers });
  } catch (error) {
    res.json({ error: "Server error" });
  }
});

// Edit member details
router.put("/:id", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a member
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
