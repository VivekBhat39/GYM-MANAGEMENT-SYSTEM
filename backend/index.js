const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const memberRoutes = require("./routes/memberRoutes");
const packageRoutes = require("./routes/packageRoutes");
const sendReminderRoutes = require("./routes/sendReminderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.get("/", (req, res)=>{
    res.send("Welcome to Gyme Managemant App, \n By :- Vivek Bhat")
  })

app.use("/api/members", memberRoutes);
app.use("/api/packages", packageRoutes);
// app.use("/api/whatsapp", whatsappRoutes);
app.use("/send-reminder", sendReminderRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));