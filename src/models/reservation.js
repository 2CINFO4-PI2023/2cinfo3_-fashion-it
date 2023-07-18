const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  numberOfPlaces: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
