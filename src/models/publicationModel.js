const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TypePublication',
    required: true
  }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
