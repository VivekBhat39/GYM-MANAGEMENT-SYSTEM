
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
  const { phone, name, endDate } = req.body;
  const message = `Hello ${name}, your gym membership fees will expire on ${endDate}. Please renew your membership soon.`;

  client.messages
    .create({
      from: "Morya Gym",
      to: `whatsapp:${phone}`,
      body: message,
    })
    .then(response => res.json({ status: "success", data: message }))
    .catch(error => res.status(500).send({ success: false, error }));
});

module.exports = router;