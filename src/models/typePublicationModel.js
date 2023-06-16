const mongoose = require('mongoose');

const typePublicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const TypePublication = mongoose.model('TypePublication', typePublicationSchema);

module.exports = TypePublication;
