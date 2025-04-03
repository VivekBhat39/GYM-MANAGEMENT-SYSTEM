const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  duration: { type: Number, required: true }, // Duration in months
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Package", packageSchema);