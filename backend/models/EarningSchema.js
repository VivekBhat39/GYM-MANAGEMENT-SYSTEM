const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['monthly', 'quarterly', 'yearly'], required: true },
});

const Earning = mongoose.model('earning', earningSchema);
module.exports = Earning;
