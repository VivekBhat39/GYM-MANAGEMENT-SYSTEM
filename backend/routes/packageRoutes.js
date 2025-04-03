const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

// Create a package
router.post("/", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.json({ message: "Package created successfully", data: newPackage });
  } catch (error) {
    res.json({ status: "Server error", data: error });
  }
});

// Get all packages
router.get("/", async (req, res) => {
  try {
    const packages = await Package.find();
    res.json({ status: "success", data: packages });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

// Get Single package
router.get("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    res.json({ status: "success", data: package });
  } catch (error) {
    res.json({ status: "error", data: error });
  }
});

// Update package details
router.put("/:id", async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: "suucess", data: updatedPackage });
  } catch (error) {
    res.json({ error: "Server error", data: error });
  }
});

// Delete a package
router.delete("/:id", async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully", data: Package });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;