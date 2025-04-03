const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const axios = require("axios");

const WHATSAPP_API_URL = "https://api.twilio.com/"; // Replace with your Twilio or WhatsApp API
const WHATSAPP_NUMBER = "your_whatsapp_number";
const AUTH_TOKEN = "your_auth_token";

// Send reminder message
router.post("/reminder/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate("package");
    if (!member) return res.status(404).json({ error: "Member not found" });

    const message = `Hello ${member.name}, your ${member.package.name} membership is about to expire on ${member.endDate.toDateString()}. Please renew your package.`;

    await axios.post(WHATSAPP_API_URL, {
      to: member.phone,
      from: WHATSAPP_NUMBER,
      body: message
    });

    res.json({ message: "Reminder sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Send promotional offers
router.post("/offer", async (req, res) => {
  try {
    const { message } = req.body;
    const members = await Member.find({ status: "Active" });

    for (let member of members) {
      await axios.post(WHATSAPP_API_URL, {
        to: member.phone,
        from: WHATSAPP_NUMBER,
        body: message
      });
    }

    res.json({ message: "Offers sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;