// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  reservations: [
    {
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
      numberOfPlaces: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
