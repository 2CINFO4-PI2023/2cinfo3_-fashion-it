// models/type_event.js
const mongoose = require('mongoose');

const typeEventSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  ]
});

module.exports = mongoose.model('TypeEvent', typeEventSchema);
