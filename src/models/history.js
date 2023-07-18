// models/history.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

module.exports = mongoose.model('History', historySchema);
